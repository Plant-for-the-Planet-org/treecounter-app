import Config from 'react-native-config';

// copy Config to process.env to use React-Native like React
for (e in Config) process.env[e] = Config[e];
