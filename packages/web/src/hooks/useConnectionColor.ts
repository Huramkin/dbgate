import { useMemo } from 'react';

export function useConnectionColor(
  dbid: { conid: string; database?: string } | null,
  colorTarget: string = 'background',
  prefix: string = 'background: ',
  includeDefault: boolean = false
): string {
  return useMemo(() => {
    if (!dbid?.conid) return '';

    const colorKey = dbid.database
      ? `dbcolor_${dbid.conid}_${dbid.database}_${colorTarget}`
      : `conncolor_${dbid.conid}_${colorTarget}`;

    const savedColor = localStorage.getItem(colorKey);
    if (savedColor) {
      return `${prefix}${savedColor}`;
    }

    if (!dbid.database) return '';

    const connColorKey = `conncolor_${dbid.conid}_${colorTarget}`;
    const connColor = localStorage.getItem(connColorKey);
    if (connColor) {
      return `${prefix}${connColor}`;
    }

    return '';
  }, [dbid?.conid, dbid?.database, colorTarget, prefix, includeDefault]);
}

export function useConnectionColorFactory(
  colorTarget: string = 'background',
  prefix: string = 'background: '
) {
  return (props: any): string => {
    if (!props?.conid) return '';

    const colorKey = props.database
      ? `dbcolor_${props.conid}_${props.database}_${colorTarget}`
      : `conncolor_${props.conid}_${colorTarget}`;

    const savedColor = localStorage.getItem(colorKey);
    if (savedColor) {
      return `${prefix}${savedColor}`;
    }

    return '';
  };
}
