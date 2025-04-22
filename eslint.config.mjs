// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    rules: {
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'any', // Разрешить и <img />, и <img>
            normal: 'any', // Запретить самозакрытие для обычных тегов (<div />)
            component: 'always', // Разрешить для Vue-компонентов (<MyComponent />)
          },
        },
      ],
    },
  },
]);