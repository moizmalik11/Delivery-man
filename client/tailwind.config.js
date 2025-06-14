/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4F46E5',
                    50: '#EBEAFD',
                    100: '#D7D5FB',
                    200: '#AFABF8',
                    300: '#8781F4',
                    400: '#5F57F1',
                    500: '#4F46E5',
                    600: '#2D23D4',
                    700: '#221BA3',
                    800: '#171372',
                    900: '#0C0B41',
                    950: '#060626'
                },
                secondary: {
                    DEFAULT: '#10B981',
                    50: '#E6FBF4',
                    100: '#CDF7E9',
                    200: '#9CF0D4',
                    300: '#6AE8BE',
                    400: '#38E1A9',
                    500: '#10B981',
                    600: '#0C8B61',
                    700: '#085D41',
                    800: '#042E20',
                    900: '#000000',
                    950: '#000000'
                },
                success: {
                    DEFAULT: '#22C55E',
                    50: '#E9F9EF',
                    100: '#D3F3DF',
                    200: '#A7E7BF',
                    300: '#7CDB9F',
                    400: '#50CF7F',
                    500: '#22C55E',
                    600: '#1A954B',
                    700: '#136537',
                    800: '#0B3524',
                    900: '#030501',
                    950: '#000000'
                },
                warning: {
                    DEFAULT: '#F59E0B',
                    50: '#FEF3D7',
                    100: '#FDECC3',
                    200: '#FCDD9B',
                    300: '#FACE73',
                    400: '#F9BF4B',
                    500: '#F59E0B',
                    600: '#C07C08',
                    700: '#8A5906',
                    800: '#543603',
                    900: '#1E1401',
                    950: '#030200'
                },
                danger: {
                    DEFAULT: '#EF4444',
                    50: '#FDEDED',
                    100: '#FBDBDB',
                    200: '#F8B7B7',
                    300: '#F49393',
                    400: '#F16F6F',
                    500: '#EF4444',
                    600: '#E71414',
                    700: '#B30F0F',
                    800: '#7F0B0B',
                    900: '#4B0606',
                    950: '#310404'
                },
                background: '#F9FAFB',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            boxShadow: {
                'card': '0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.08)',
                'elevated': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            },
        },
    },
    plugins: [],
}