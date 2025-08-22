# Rent - C2C Item Rental Platform

Rent is a modern consumer-to-consumer (C2C) item rental platform built with React Native and Expo.

## Screenshots of the app
<img width="200" height="963" alt="Screenshot 2025-08-22 at 12 15 46 AM" src="https://github.com/user-attachments/assets/fe36b8f6-6473-41dd-99a9-636c10f8c72d" />
<img width="200" height="954" alt="Screenshot 2025-08-22 at 12 15 59 AM" src="https://github.com/user-attachments/assets/567c8f0e-7bfa-4dae-a455-82fb7bdb880f" />
<img width="200" height="962" alt="Screenshot 2025-08-22 at 12 16 16 AM" src="https://github.com/user-attachments/assets/cfb9faba-8c46-401c-952d-866548829ff3" />
<img width="200" height="953" alt="Screenshot 2025-08-22 at 12 16 28 AM" src="https://github.com/user-attachments/assets/14f6fd6c-2278-485e-b32f-b5169b328de8" />
<img width="200" height="959" alt="Screenshot 2025-08-22 at 12 16 37 AM" src="https://github.com/user-attachments/assets/3b75121b-227d-4d00-9c16-0f3975adeed3" />
<img width="200" height="957" alt="Screenshot 2025-08-22 at 12 16 49 AM" src="https://github.com/user-attachments/assets/8e7bf114-ab4d-4a80-8c64-14eaa7eeedbd" />

## Features

- 📱 Cross-platform mobile application (iOS & Android)
- 🔍 Browse available items for rent
- 📸 Upload and manage item listings with photos
- 💰 Set rental prices and availability
- 📍 Location-based item discovery
- 💬 In-app messaging between renters and owners
- ⭐ Rating and review system
- 📅 Calendar-based availability management

## Tech Stack

- **React Native** (0.79.2) - Cross-platform mobile development
- **Expo** (53.0.9) - Development platform and tools
- **TypeScript** - Type-safe JavaScript

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)
- Expo Go app for testing on physical devices

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gabrielcoffee/rent-frontend.git
cd rent-frontend
```

2. Install dependencies:
```bash
npx install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

The project follows Expo Router's file-based routing convention:

```
rent-frontend/
├── app/                    # Main application screens and navigation
│   ├── _layout.tsx        # Root layout configuration
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── item/              # Item-related screens
│   └── +not-found.tsx     # 404 error page
├── components/            # Reusable React components
│   ├── Button.tsx         # Custom button component
│   ├── ItemGrid.tsx       # Item grid layout
│   ├── RentableItemCard.tsx # Item card component
│   ├── ReviewsGrid.tsx    # Reviews display
│   └── ...                # Other UI components
├── assets/                # Images, fonts, and static assets
├── database.sql           # Database schema and setup
└── package.json           # Project dependencies and scripts
```

The app follows modern React Native development practices with a focus on performance and user experience.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Gabriel Fernandes Pereira
