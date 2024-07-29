import { App, Directive } from 'vue';
import { sortObjectKeys, stringToHash, toKebabCase } from './utils';

const map = new Map();

function addScriptTag(el: any, value: any) {
    const valueSorted = sortObjectKeys(value);
    const styles = Object.entries(valueSorted).reduce(
        (previusValue, currentValue) => {
            const [key, value] = currentValue;
            if (value)
                return `${previusValue}${toKebabCase(key)}: ${value};\n`;
            return previusValue;
        },
        '',
    );

    const hash = stringToHash(styles);
    if (map.has(hash)) {
      const count = map.get(hash) as number;
      map.set(hash, count + 1);
    } else {
      const className = `v-style-${stringToHash(styles)}`;

      const styleElement = document.createElement('style');
      styleElement.dataset.className = className;

      styleElement.innerHTML = `.${className} { ${styles} }`;

      document.head.appendChild(styleElement);

      el.classList.add(className);
      el.setAttribute('data-custom-class', className);
      map.set(hash, 1);
    }
}

function removeScriptTag(el: any) {
  const className: string | undefined | null = el.getAttribute('data-custom-class');
    if (className) {
        const hash = className.split('-')[2];
        const styleElement = document.querySelector(
            `style[data-class-name="${className}"]`,
        );
        if (styleElement) {
            styleElement.parentNode.removeChild(styleElement);
        }
        el.classList.remove(className);
        if (map.get(hash) === 1) {
          map.delete(hash);
        } else {
          map.set(hash, map.get(hash) - 1);
        }
    }
}

export const vStyle: Directive = {
  created(el, binding) {
    const { value } = binding;
    addScriptTag(el, value)
  },
  updated(el, binding) {
    const { value } = binding;
    removeScriptTag(el);
    addScriptTag(el, value);
  },
  beforeUnmount(el) {
    removeScriptTag(el);
  }
};

export default function install(app: App) {
  app.directive('style', vStyle);
}