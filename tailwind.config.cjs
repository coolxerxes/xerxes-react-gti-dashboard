/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		container: {
			center: true,
					fontSize: {
				base: '15px',
			},
			screens: {
				DEFAULT: '100%',
			},
		},
		extend: {
			colors: {
				primary: '#C02328',
				red1: '#ff000091',
				lightRed: '#CD4F53',
				darkRed: '#ff000025',
				mediumRed: '#E09194',
				lightRedBg: '#F6DEDF',
				secondary: '#ABA5A2',
				gray: '#aba5a2',
				gray1: '#A098AE',
				bodyGray: '#f4f4f4',

				lightGray: '#d9d9d9',
				normalBlack: '#393230',
				labelBlack: '#272524',
				grey: '#FAFAFA',
				pink: '#fc5c61',
				cyan: '#53E3E8',
				lightCyan: '#58B9BD',
				lightBlue: '#0B6DD9',
				blueBg: '#F3F8FD',
				orange: '#FFA754',
				orangeBg: '#FDF7F2',
				greenBg: '##FAFCF6',
				cyanBg: '#F3FAFA',
				green: '#75D14E',
				reservedGray: '#E2E2E2',
				black1: '#1E3A56',
				black2: '#000000a5',
				black3: '#00000075',
				black4: '#00000088',
				fadedBlack: '#000000D9',
				gray2: '#79828B',
				gray3: '#2E2E2E',
				gray4: '#DBDBDB',
				lightRedBackground: '#FCF4F4',
				bgGreen: '#A3C0480D',
				darkGreen: '#389E0D',
				inputBg: '#F5F5F5',
				checkBoxChecked: '#77E6B6',
				checkBoxUnchecked: '#EEEDEC',
				borderGray: '#E6E6E6',
				darkOrange: '#D46B08',
				dimText: '#9F9F9F',
				facebookBlue: '#3b5998',
				twitterSkyBlue: '#00acee',
				linkedInBlue: '#0C63BC',
				googlePlusOrange: '#db4a39',
				prefixDisableColor: '#B1ABAA',
				suffixDisableColor: '#AAAAAA',
				editIconBg: '#1480c342',
				editIconColor: '#147FC3',
				deleteIconBg: '#fe646e40',
				deleteIconColor: '#FE646F',

				text: {
					DEFAULT: '#333333',
					light: '#555555',
				},
				editor: {
					primary: {
						DEFAULT: 'var(--editor-color-primary)',
					},
				},
			},
			backgroundImage: {
				'hero-faq': "url('/static/imgs/about/reciveBanner.png')",
			},
			//@imported fron next commerce
			maxWidth: {
				'8xl': '1920px',
			},
			borderRadius: {
				small: '5px',
			},
			keyframes: {
				success: {
					'0%': { transform: 'scale(0)', opacity: 0 },
					'40%': { transform: 'scale(0.5)', opacity: 0.05 },
					'100%': { transform: 'scale(1)', opacity: 1 },
				},
			},
			animation: {
				'succes-cont': 'success .3s linear ',
				'right-success': 'success .7s linear ',
			},

			boxShadow: {
				'outline-normal': '0 0 0 2px var(--accent-2)',
				magical:
					'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
				DEFAULT: '0px 4px 10px #0000000D',
			},
			lineHeight: {
				'extra-loose': '2.2',
			},
			scale: {
				120: '1.2',
			},
			spacing: {
				2.5: '10px',
			},
			fontFamily: {
				dinBold: ['DIN Next LT Arabic Bold', 'sans-serif'],
				dinNormal: ['DIN Next LT Arabic', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
