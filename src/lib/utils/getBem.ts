import { withNaming } from '@bem-react/classname';
import cx, { ClassValue } from 'classnames';

/**
 * Helper to concat BEM-friendly classnames and concat additional classnames all
 * in one swing.
 *
 * @param block
 */
export function getBem(block: string) {
  let cn = withNaming({ e: '__', m: '--', v: '-' });
  /**
   * @param [configOrClassName]
   * @param [classNames]
   */
  function helper(
    configOrClassName?: string | BemConfig,
    ...classNames: ClassValue[]
  ) {
    if (typeof configOrClassName === 'string') {
      return cx(block, configOrClassName, ...classNames);
    } else if (configOrClassName != null) {
      let { el = null, ...modifiers } = configOrClassName;
      let base = el ? cn(block, el) : cn(block);
      return cx(base(modifiers), ...classNames);
    }
    return block;
  }
  return helper;
}

type Modifiers = {
  [key: string]: string | boolean | undefined;
};

type BemConfig = Modifiers & {
  el?: string;
};
