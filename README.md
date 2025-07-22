# Rent - C2C Item Rental Platform

Rent is a modern consumer-to-consumer (C2C) item rental platform built with React Native and Expo. This application allows users to rent out their items to others and rent items from other users in their community.

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
- **Expo Router** - File-based routing system
- **React Navigation** - Navigation library
- **Expo Image Picker** - Image selection and camera access
- **React Native Reanimated** - Smooth animations
- **Expo Blur** - Blur effects and overlays

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)
- Expo Go app for testing on physical devices

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd rent-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
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

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality
- `npm run reset-project` - Reset project configuration

## Development

This project uses:
- **Expo Router** for file-based navigation
- **TypeScript** for type safety
- **ESLint** for code quality
- **Expo Image Picker** for photo uploads
- **React Native Reanimated** for smooth animations

The app follows modern React Native development practices with a focus on performance and user experience.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built using React Native and Expo
