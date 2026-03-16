import React from 'react';
import { cn } from '@/lib/utils';

const iconNames: Record<string, string> = {
  'icon minus-box': 'mdi mdi-minus-box-outline',
  'icon plus-box': 'mdi mdi-plus-box-outline',
  'icon plus-thick': 'mdi mdi-plus-thick',
  'icon minus-thick': 'mdi mdi-minus-thick',
  'icon invisible-box': 'mdi mdi-minus-box-outline icon-invisible',
  'icon cloud-upload': 'mdi mdi-cloud-upload',
  'icon cloud': 'mdi mdi-cloud',
  'icon cloud-public': 'mdi mdi-cloud-search',
  'icon cloud-private': 'mdi mdi-cloud-key',
  'icon import': 'mdi mdi-application-import',
  'icon export': 'mdi mdi-application-export',
  'icon new-connection': 'mdi mdi-database-plus',
  'icon tables': 'mdi mdi-table-multiple',
  'icon favorite': 'mdi mdi-star',
  'icon share': 'mdi mdi-share-variant',
  'icon add': 'mdi mdi-plus-circle',
  'icon minus': 'mdi mdi-minus-circle',
  'icon connection': 'mdi mdi-connection',
  'icon cell-data': 'mdi mdi-details',
  'icon sql-generator': 'mdi mdi-cog-transfer',
  'icon keyboard': 'mdi mdi-keyboard-settings',
  'icon settings': 'mdi mdi-cog',
  'icon users': 'mdi mdi-account-multiple',
  'icon role': 'mdi mdi-account-group',
  'icon admin': 'mdi mdi-security',
  'icon auth': 'mdi mdi-account-key',
  'icon version': 'mdi mdi-ticket-confirmation',
  'icon pin': 'mdi mdi-pin',
  'icon pin-outline': 'mdi mdi-pin-outline',
  'icon arrange': 'mdi mdi-arrange-send-to-back',
  'icon app': 'mdi mdi-layers-triple',
  'icon open-in-new': 'mdi mdi-open-in-new',
  'icon add-folder': 'mdi mdi-folder-plus-outline',
  'icon add-column': 'mdi mdi-table-column-plus-after',
  'icon parameter': 'mdi mdi-at',
  'icon trigger': 'mdi mdi-lightning-bolt',
  'icon scheduler-event': 'mdi mdi-calendar-blank',
  'icon arrow-link': 'mdi mdi-arrow-top-right-thick',
  'icon reset': 'mdi mdi-cancel',
  'icon send': 'mdi mdi-send',
  'icon regex': 'mdi mdi-regex',
  'icon list': 'mdi mdi-format-list-bulleted-triangle',
  'icon help': 'mdi mdi-help',
  'icon window-restore': 'mdi mdi-window-restore',
  'icon window-maximize': 'mdi mdi-window-maximize',
  'icon window-close': 'mdi mdi-window-close',
  'icon window-minimize': 'mdi mdi-window-minimize',
  'img dbgate': 'mdi mdi-database color-icon-gold',
  'icon columns': 'mdi mdi-view-column',
  'icon columns-outline': 'mdi mdi-view-column-outline',
  'icon locked-database-mode': 'mdi mdi-database-lock',
  'icon unlocked-database-mode': 'mdi mdi-database-eye',
  'icon database': 'mdi mdi-database',
  'icon server': 'mdi mdi-server',
  'icon api-server': 'mdi mdi-cloud-outline',
  'icon table': 'mdi mdi-table',
  'icon form': 'mdi mdi-form-select',
  'icon archive': 'mdi mdi-archive',
  'icon file': 'mdi mdi-file',
  'icon opened-tabs': 'mdi mdi-book-open-blank-variant-outline',
  'icon stars': 'mdi mdi-creation',
  'icon loading': 'mdi mdi-loading mdi-spin',
  'icon close': 'mdi mdi-close',
  'icon close-all': 'mdi mdi-close-box-multiple-outline',
  'icon unsaved': 'mdi mdi-record',
  'icon stop': 'mdi mdi-close-octagon',
  'icon play': 'mdi mdi-play',
  'icon play-stop': 'mdi mdi-stop',
  'icon pause': 'mdi mdi-pause',
  'icon filter': 'mdi mdi-filter',
  'icon filter-off': 'mdi mdi-filter-off',
  'icon reload': 'mdi mdi-reload',
  'icon refresh': 'mdi mdi-refresh',
  'icon undo': 'mdi mdi-undo',
  'icon redo': 'mdi mdi-redo',
  'icon save': 'mdi mdi-content-save',
  'icon apply': 'mdi mdi-content-save-check',
  'icon account': 'mdi mdi-account',
  'icon sql-file': 'mdi mdi-file',
  'icon web': 'mdi mdi-web',
  'icon home': 'mdi mdi-home',
  'icon query-design': 'mdi mdi-vector-polyline-edit',
  'icon history': 'mdi mdi-history',
  'icon structure': 'mdi mdi-tools',
  'icon square': 'mdi mdi-square',
  'icon data-deploy': 'mdi mdi-database-settings',
  'icon team-file': 'mdi mdi-account-file',
  'icon team-folder': 'mdi mdi-account-details',
  'icon graphql': 'mdi mdi-graphql',
  'icon cloud-account': 'mdi mdi-account-remove-outline',
  'icon cloud-account-connected': 'mdi mdi-account-check-outline',
  'icon edit': 'mdi mdi-pencil',
  'icon delete': 'mdi mdi-delete',
  'icon arrow-up': 'mdi mdi-arrow-up',
  'icon arrow-down': 'mdi mdi-arrow-down',
  'icon arrow-left': 'mdi mdi-arrow-left',
  'icon arrow-right': 'mdi mdi-arrow-right',
  'icon format-code': 'mdi mdi-code-tags-check',
  'icon disconnected': 'mdi mdi-lan-disconnect',
  'icon theme': 'mdi mdi-brightness-6',
  'icon error': 'mdi mdi-close-circle',
  'icon ok': 'mdi mdi-check-circle',
  'icon check': 'mdi mdi-check',
  'icon markdown': 'mdi mdi-application',
  'icon preview': 'mdi mdi-file-find',
  'icon eye': 'mdi mdi-eye',
  'icon perspective': 'mdi mdi-eye',
  'icon check-all': 'mdi mdi-check-all',
  'icon dots-horizontal': 'mdi mdi-dots-horizontal',
  'icon dots-vertical': 'mdi mdi-dots-vertical',
  'icon json': 'mdi mdi-code-json',
  'icon lock': 'mdi mdi-lock',
  'icon download': 'mdi mdi-download',
  'icon text': 'mdi mdi-text',
  'icon ai': 'mdi mdi-head-lightbulb',
  'icon copy': 'mdi mdi-content-copy',
  'icon run': 'mdi mdi-play',
  'icon chevron-down': 'mdi mdi-chevron-down',
  'icon chevron-left': 'mdi mdi-chevron-left',
  'icon chevron-right': 'mdi mdi-chevron-right',
  'icon chevron-up': 'mdi mdi-chevron-up',
  'icon menu': 'mdi mdi-menu',
  'icon plugin': 'mdi mdi-toy-brick',
  'icon split': 'mdi mdi-view-split-vertical',
  'icon premium': 'mdi mdi-star',
  'icon upload': 'mdi mdi-upload',
  'icon api': 'mdi mdi-api',
  'icon chart': 'mdi mdi-chart-bar',
  'icon diagram': 'mdi mdi-graph',
  'icon warn': 'mdi mdi-alert',
  'img ok': 'mdi mdi-check-circle color-icon-green',
  'img ok-statusbar': 'mdi mdi-check-circle color-icon-statusbar-green',
  'img alert': 'mdi mdi-alert-circle color-icon-blue',
  'img error': 'mdi mdi-close-circle color-icon-red',
  'img error-statusbar': 'mdi mdi-close-circle color-icon-statusbar-red',
  'img warn': 'mdi mdi-alert color-icon-gold',
  'img info': 'mdi mdi-information color-icon-blue',
  'img database': 'mdi mdi-database color-icon-gold',
  'img table': 'mdi mdi-table color-icon-blue',
  'img collection': 'mdi mdi-table color-icon-red',
  'img view': 'mdi mdi-table color-icon-magenta',
  'img procedure': 'mdi mdi-cog color-icon-blue',
  'img function': 'mdi mdi-function-variant',
  'img server': 'mdi mdi-server color-icon-blue',
  'img connection': 'mdi mdi-connection color-icon-blue',
  'img sql-file': 'mdi mdi-file',
  'img favorite': 'mdi mdi-star color-icon-yellow',
  'img folder': 'mdi mdi-folder color-icon-yellow',
  'img primary-key': 'mdi mdi-key-star color-icon-yellow',
  'img foreign-key': 'mdi mdi-key-link',
  'img column': 'mdi mdi-table-column',
  'img archive': 'mdi mdi-table color-icon-gold',
  'img archive-folder': 'mdi mdi-database-outline color-icon-green',
};

interface FontIconProps {
  icon: string;
  title?: string;
  padLeft?: boolean;
  padRight?: boolean;
  style?: React.CSSProperties;
  className?: string;
  colorClass?: string;
  onClick?: (e: React.MouseEvent) => void;
  'data-testid'?: string;
}

export default function FontIcon({
  icon,
  title,
  padLeft = false,
  padRight = false,
  style,
  className,
  colorClass,
  onClick,
  'data-testid': testId,
}: FontIconProps) {
  const iconValue = typeof icon === 'string' ? icon : (icon as any)?.light || (icon as any)?.dark || '';
  const isSvgString = iconValue.trim().startsWith('<svg');
  const isTextIcon = iconValue.trim().startsWith('text ');

  if (isSvgString) {
    return (
      <span
        className={cn('inline-block leading-none', padLeft && 'ml-1', padRight && 'mr-1', className)}
        title={title}
        style={style}
        onClick={onClick}
        data-testid={testId}
        dangerouslySetInnerHTML={{ __html: iconValue }}
      />
    );
  }

  if (isTextIcon) {
    const parts = iconValue.trim().split(' ');
    return (
      <span
        className={cn(
          'text-[0.7em] inline-block text-center rounded-[3px] mr-1 font-bold p-0.5',
          padLeft && 'ml-1',
          padRight && 'mr-1',
          className
        )}
        style={{ backgroundColor: parts[2] || 'inherit', ...style }}
        onClick={onClick}
        data-testid={testId}
      >
        {parts[1]}
      </span>
    );
  }

  return (
    <span
      className={cn(iconNames[iconValue] || iconValue, colorClass, padLeft && 'ml-1', padRight && 'mr-1', className)}
      title={title}
      style={style}
      onClick={onClick}
      data-testid={testId}
    />
  );
}

export function getNumberIcon(number: number): string | null {
  if (number >= 1 && number <= 9) return `mdi mdi-numeric-${number}-circle`;
  if (number > 9) return 'mdi mdi-numeric-9-plus-circle';
  return null;
}
