-- ===========================================================
-- 1. Create Currency Lookup Table
-- ===========================================================
CREATE TABLE public.currency (
  code        TEXT      NOT NULL PRIMARY KEY,         -- e.g. 'BRL', 'USD', 'EUR'
  name        TEXT      NOT NULL,                     -- e.g. 'Brazilian Real'
  symbol      TEXT      NULL,                         -- e.g. 'R$'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.currency IS 'List of supported currency codes with human-readable names and symbols.';

-- Insert initial currencies
INSERT INTO public.currency (code, name, symbol) VALUES
  ('BRL', 'Brazilian Real', 'R$'),
  ('USD', 'United States Dollar', '$');

-- ===========================================================
-- 2. Create Category and Subcategory Tables (with translations)
-- ===========================================================

-- 2.1. Table “category”
CREATE TABLE public.category (
  id         UUID      NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  code       TEXT      NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.category IS 'Top-level groups for organizing items (e.g. Electronics, Sports).';

-- 2.2. Table “category_translation”
CREATE TABLE public.category_translation (
  id           UUID      NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id  UUID      NOT NULL
                REFERENCES public.category(id) ON DELETE CASCADE,
  locale       TEXT      NOT NULL,    -- e.g. 'pt', 'en', 'es'
  name         TEXT      NOT NULL,
  description  TEXT      NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(category_id, locale)
);

COMMENT ON TABLE public.category_translation IS 'Holds translated names and descriptions for each category in various locales.';

-- 2.3. Table “subcategory”
CREATE TABLE public.subcategory (
  id          UUID      NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID      NOT NULL
                REFERENCES public.category(id) ON DELETE CASCADE,
  code        TEXT      NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(category_id, code)
);

COMMENT ON TABLE public.subcategory IS 'More specific groups under each category (e.g. Cameras under Electronics).';

-- 2.4. Table “subcategory_translation”
CREATE TABLE public.subcategory_translation (
  id             UUID      NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  subcategory_id UUID      NOT NULL
                  REFERENCES public.subcategory(id) ON DELETE CASCADE,
  locale         TEXT      NOT NULL,
  name           TEXT      NOT NULL,
  description    TEXT      NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(subcategory_id, locale)
);

COMMENT ON TABLE public.subcategory_translation IS 'Holds translated names and descriptions for each subcategory in various locales.';

-- ===========================================================
-- 3. Create Item, Booking, Rental, Request Tables
-- ===========================================================

-- 3.1. Table “item”
CREATE TABLE public.item (
  id             UUID           NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id       UUID           NOT NULL
                   REFERENCES public.profile(id) ON DELETE CASCADE,
  title          TEXT           NOT NULL,
  description    TEXT           NOT NULL,
  price_daily    NUMERIC(10,2)  NOT NULL,
  price_weekly   NUMERIC(10,2)  NULL,
  price_monthly  NUMERIC(10,2)  NULL,
  currency       TEXT           NOT NULL    DEFAULT 'BRL'
                   REFERENCES public.currency(code) ON UPDATE CASCADE ON DELETE RESTRICT,
  is_active      BOOLEAN        NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.item IS 'Represents all items listed by users as available for rent.';

-- 3.2. Table “booking”
CREATE TABLE public.booking (
  id               UUID           NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id          UUID           NOT NULL
                     REFERENCES public.item(id) ON DELETE CASCADE,
  requester_id     UUID           NOT NULL
                     REFERENCES public.profile(id) ON DELETE CASCADE,
  requested_start  DATE           NOT NULL,
  requested_end    DATE           NOT NULL,
  proposed_price   NUMERIC(10,2)  NULL,
  status           TEXT           NOT NULL    DEFAULT 'pending'
                   CHECK (status IN ('pending','declined','approved','canceled')),
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.booking IS 'Stores requests made by users to rent an existing item from the catalog.';

-- 3.3. Table “rental”
CREATE TABLE public.rental (
  id               UUID           NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id       UUID           NULL
                     REFERENCES public.booking(id) ON DELETE SET NULL,
  item_id          UUID           NOT NULL
                     REFERENCES public.item(id) ON DELETE CASCADE,
  renter_id        UUID           NOT NULL
                     REFERENCES public.profile(id) ON DELETE CASCADE,
  owner_id         UUID           NOT NULL
                     REFERENCES public.profile(id),
  actual_start     DATE           NOT NULL,
  actual_end       DATE           NULL,
  status           TEXT           NOT NULL DEFAULT 'active'
                   CHECK (status IN ('active','completed','canceled','late')),
  final_price      NUMERIC(10,2)  NULL,
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.rental IS 'Captures rental contracts that are currently active or completed between two users.';

-- 3.4. Table “request”
CREATE TABLE public.request (
  id               UUID           NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID           NOT NULL
                     REFERENCES public.profile(id) ON DELETE CASCADE,
  title            TEXT           NOT NULL,
  description      TEXT           NULL,
  requested_start  DATE           NOT NULL,
  requested_end    DATE           NOT NULL,
  max_price_daily   NUMERIC(10,2) NULL,
  max_price_weekly  NUMERIC(10,2) NULL,
  max_price_monthly NUMERIC(10,2) NULL,
  status           TEXT           NOT NULL DEFAULT 'open'
                   CHECK (status IN ('open','matched','expired','canceled')),
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.request IS 'Allows users to express demand for items not yet listed by others.';

-- ===========================================================
-- 4. Create Many-to-Many Linking Table: item_subcategory
-- ===========================================================
CREATE TABLE public.item_subcategory (
  item_id        UUID      NOT NULL
                   REFERENCES public.item(id) ON DELETE CASCADE,
  subcategory_id UUID      NOT NULL
                   REFERENCES public.subcategory(id) ON DELETE CASCADE,
  PRIMARY KEY (item_id, subcategory_id)
);

COMMENT ON TABLE public.item_subcategory IS 'Associates items with one or more subcategories.';

-- ===========================================================
-- 5. Trigger Function for updated_at
-- ===========================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5.1. Triggers on each table to keep updated_at current

CREATE TRIGGER trg_currency_updated_at
  BEFORE UPDATE ON public.currency
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_category_updated_at
  BEFORE UPDATE ON public.category
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_category_translation_updated_at
  BEFORE UPDATE ON public.category_translation
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_subcategory_updated_at
  BEFORE UPDATE ON public.subcategory
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_subcategory_translation_updated_at
  BEFORE UPDATE ON public.subcategory_translation
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_item_updated_at
  BEFORE UPDATE ON public.item
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_booking_updated_at
  BEFORE UPDATE ON public.booking
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_rental_updated_at
  BEFORE UPDATE ON public.rental
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_request_updated_at
  BEFORE UPDATE ON public.request
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_item_subcategory_updated_at
  BEFORE UPDATE ON public.item_subcategory
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===========================================================
-- 6. Indexes to Improve Performance (omitting small tables)
-- ===========================================================

-- 6.1. item.owner_id
CREATE INDEX IF NOT EXISTS idx_item_owner_id
  ON public.item(owner_id);

-- 6.2. booking.item_id and booking.requester_id
CREATE INDEX IF NOT EXISTS idx_booking_item_id
  ON public.booking(item_id);
CREATE INDEX IF NOT EXISTS idx_booking_requester_id
  ON public.booking(requester_id);

-- 6.3. rental.booking_id, rental.item_id, rental.renter_id, rental.owner_id
CREATE INDEX IF NOT EXISTS idx_rental_booking_id
  ON public.rental(booking_id);
CREATE INDEX IF NOT EXISTS idx_rental_item_id
  ON public.rental(item_id);
CREATE INDEX IF NOT EXISTS idx_rental_renter_id
  ON public.rental(renter_id);
CREATE INDEX IF NOT EXISTS idx_rental_owner_id
  ON public.rental(owner_id);

-- 6.4. request.user_id
CREATE INDEX IF NOT EXISTS idx_request_user_id
  ON public.request(user_id);

-- 6.5. item_subcategory.subcategory_id
CREATE INDEX IF NOT EXISTS idx_item_subcategory_subcategory_id
  ON public.item_subcategory(subcategory_id);
