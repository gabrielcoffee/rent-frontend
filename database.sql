-- ===========================================================
-- 0. Common Extensions & Utilities
-- ===========================================================

-- Enable PostGIS once
CREATE EXTENSION IF NOT EXISTS postgis;

-- UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Single trigger function to keep all updated_at columns current
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ===========================================================
-- 1. Lookup Tables
-- ===========================================================

-- 1.1 Currency
CREATE TABLE IF NOT EXISTS public.currency (
  id         UUID         NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  code       TEXT         NOT NULL UNIQUE,
  name       TEXT         NOT NULL,
  symbol     TEXT,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.currency IS 'Supported currency codes';
INSERT INTO public.currency (code,name,symbol)
  VALUES ('BRL','Brazilian Real','R$'),('USD','US Dollar','$')
ON CONFLICT DO NOTHING;

-- 1.2 Category
CREATE TABLE IF NOT EXISTS public.category (
  id         UUID         NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  code       TEXT         NOT NULL UNIQUE,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.category IS 'Top–level item groups';


-- ===========================================================
-- 2. Core User/Profile Tables
-- ===========================================================

-- 2.1 Profile
CREATE TABLE IF NOT EXISTS public.profile (
  id               UUID                   NOT NULL PRIMARY KEY 
                       REFERENCES auth.users(id) ON DELETE CASCADE,
  username         TEXT                   NOT NULL UNIQUE,
  display_name     TEXT                   NOT NULL,
  full_name        TEXT                   NOT NULL,
  phone_number     TEXT,
  avatar_url       TEXT,
  bio              TEXT,
  rating_sum       INTEGER                NOT NULL DEFAULT 0,
  rating_count     INTEGER                NOT NULL DEFAULT 0,
  is_verified      BOOLEAN                NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ            NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ            NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.profile IS 'User profiles';


-- ===========================================================
-- 3. Address Management
-- ===========================================================

-- 3.1 Address
CREATE TABLE IF NOT EXISTS public.address (
  id            UUID           NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id    UUID           NOT NULL
                  REFERENCES public.profile(id) ON DELETE CASCADE,
  name          TEXT           NOT NULL,
  address_line1 TEXT           NOT NULL,
  address_line2 TEXT,
  city          TEXT           NOT NULL,
  state         TEXT           NOT NULL,
  postal_code   TEXT           NOT NULL,
  country       TEXT           NOT NULL,
  location      GEOGRAPHY(POINT,4326),
  is_active     BOOLEAN        NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.address IS 'Multiple addresses per user';


-- ===========================================================
-- 4. Items & Transactions
-- ===========================================================

-- 4.1 Item
CREATE TABLE IF NOT EXISTS public.item (
  id            UUID           NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id      UUID           NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  title         TEXT           NOT NULL,
  description   TEXT           NOT NULL,
  price_daily   NUMERIC(10,2)  NOT NULL,
  price_weekly  NUMERIC(10,2),
  price_monthly NUMERIC(10,2),
  currency      TEXT           NOT NULL DEFAULT 'BRL'
                   REFERENCES public.currency(code)
                   ON UPDATE CASCADE ON DELETE RESTRICT,
  verified      BOOLEAN        NOT NULL DEFAULT FALSE,
  is_active     BOOLEAN        NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.item IS 'Items listed for rent';

-- 4.2 Booking
CREATE TABLE IF NOT EXISTS public.booking (
  id              UUID           NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id         UUID           NOT NULL REFERENCES public.item(id) ON DELETE CASCADE,
  requester_id    UUID           NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  requested_start DATE           NOT NULL,
  requested_end   DATE           NOT NULL,
  proposed_price  NUMERIC(10,2),
  status          TEXT           NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','declined','approved','canceled')),
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.booking IS 'User booking requests';

-- 4.3 Rental
CREATE TABLE IF NOT EXISTS public.rental (
  id            UUID           NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id    UUID           REFERENCES public.booking(id) ON DELETE SET NULL,
  item_id       UUID           NOT NULL REFERENCES public.item(id) ON DELETE CASCADE,
  renter_id     UUID           NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  owner_id      UUID           NOT NULL REFERENCES public.profile(id),
  actual_start  DATE           NOT NULL,
  actual_end    DATE,
  status        TEXT           NOT NULL DEFAULT 'active'
                   CHECK (status IN ('active','completed','canceled','late')),
  final_price   NUMERIC(10,2),
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.rental IS 'Ongoing/completed rentals';

-- 4.4 Request
CREATE TABLE IF NOT EXISTS public.request (
  id               UUID           NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID           NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  title            TEXT           NOT NULL,
  description      TEXT,
  requested_start  DATE           NOT NULL,
  requested_end    DATE           NOT NULL,
  max_price_daily   NUMERIC(10,2),
  max_price_weekly  NUMERIC(10,2),
  max_price_monthly NUMERIC(10,2),
  status           TEXT           NOT NULL DEFAULT 'open'
                    CHECK (status IN ('open','matched','expired','canceled')),
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.request IS 'Item demand postings';

-- 4.5 Item ⇆ Category M2M
CREATE TABLE IF NOT EXISTS public.item_category (
  item_id     UUID NOT NULL REFERENCES public.item(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.category(id) ON DELETE CASCADE,
  PRIMARY KEY(item_id,category_id)
);
COMMENT ON TABLE public.item_category IS 'Item–category links';


-- ===========================================================
-- 5. Rating Tables
-- ===========================================================

-- 5.1 User Ratings
CREATE TABLE IF NOT EXISTS public.user_rating (
  id         UUID          NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID          NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  rater_id   UUID          NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  rating     SMALLINT      NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT,
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.user_rating IS 'Individual ratings given to users';

-- 5.2 Item Ratings
CREATE TABLE IF NOT EXISTS public.item_rating (
  id         UUID          NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id    UUID          NOT NULL REFERENCES public.item(id) ON DELETE CASCADE,
  rater_id   UUID          NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  rating     SMALLINT      NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT,
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.item_rating IS 'Individual ratings given to items';


-- ===========================================================
-- 6. Chat between users (1-on-1)
-- ===========================================================

CREATE TABLE IF NOT EXISTS public.conversation (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id   UUID         NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  user2_id   UUID         NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  UNIQUE (user1_id, user2_id)
);

CREATE TABLE IF NOT EXISTS public.message (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID         NOT NULL REFERENCES public.conversation(id) ON DELETE CASCADE,
  sender_id       UUID         NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  content         TEXT         NOT NULL,
  sent_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);


-- ===========================================================
-- 7. New Tables: Configs, Notifications, Blocking, Reports, Favorites
-- ===========================================================

-- 7.1 User Configurations
CREATE TABLE IF NOT EXISTS public.user_config (
  profile_id   UUID         PRIMARY KEY REFERENCES public.profile(id) ON DELETE CASCADE,
  language     TEXT         DEFAULT 'en',
  dark_mode    BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 7.2 Notification Store
CREATE TABLE IF NOT EXISTS public.notification (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id    UUID         NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  type          TEXT         NOT NULL CHECK (type IN ('conversation','opportunity','booking','system')),
  title         TEXT         NOT NULL,
  body          TEXT         NOT NULL,
  is_read       BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 7.3 Notification Config
CREATE TABLE IF NOT EXISTS public.notification_config (
  profile_id     UUID         PRIMARY KEY REFERENCES public.profile(id) ON DELETE CASCADE,
  conversation   BOOLEAN      NOT NULL DEFAULT TRUE,
  opportunity    BOOLEAN      NOT NULL DEFAULT TRUE,
  booking        BOOLEAN      NOT NULL DEFAULT TRUE,
  system         BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 7.4 Blocked Users
CREATE TABLE IF NOT EXISTS public.blocked_user (
  blocker_id   UUID NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  blocked_id   UUID NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  blocked_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (blocker_id, blocked_id)
);

-- 7.5 Item Reports
CREATE TABLE IF NOT EXISTS public.item_report (
  id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id      UUID         NOT NULL REFERENCES public.item(id) ON DELETE CASCADE,
  reporter_id  UUID         NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  reason       TEXT         NOT NULL CHECK (reason IN ('spam','inappropriate','scam','misleading','other')),
  details      VARCHAR(100),
  status       TEXT         NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending','reviewed','action_taken')),
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 7.6 User Reports
CREATE TABLE IF NOT EXISTS public.user_report (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_id   UUID         NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  reporter_id   UUID         NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  reason        TEXT         NOT NULL CHECK (reason IN ('harassment','spam','fake_profile','scam','other')),
  details       VARCHAR(100),
  status        TEXT         NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending','reviewed','action_taken')),
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 7.7 Favorites (user ↔ item)
CREATE TABLE IF NOT EXISTS public.favorite_item (
  profile_id UUID NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  item_id    UUID NOT NULL REFERENCES public.item(id)    ON DELETE CASCADE,
  favorited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (profile_id, item_id)
);


-- ===========================================================
-- 8. Attach updated_at Triggers
-- ===========================================================


DO $$
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[
    'currency','category','profile','address',
    'item','booking','rental','request',
    'user_rating','item_rating',
    'user_config','notification_config'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables
  LOOP
    EXECUTE FORMAT($f$
      CREATE TRIGGER trg_%1$s_updated
      BEFORE UPDATE ON public.%1$s
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    $f$, tbl);
  END LOOP;
END $$;
