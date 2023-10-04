import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  candidate: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      // {
      //   subheader: 'overview v5.4.0',
      //   items: [
      //     { title: 'one', path: paths.dashboard.root, icon: ICONS.dashboard },
      //     { title: 'two', path: paths.dashboard.two, icon: ICONS.ecommerce },
      //     {
      //       title: 'three',
      //       path: paths.dashboard.three,
      //       icon: ICONS.analytics,
      //     },
      //   ],
      // },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        // subheader: 'candidate',
        items: [
          {
            title: t('candidate'),
            path: paths.dashboard.candidate.root,
            icon: ICONS.candidate,
            // children: [
            //   { title: t('list'), path: paths.dashboard.candidate.root },
            //   // {
            //   //   title: t('details'),
            //   //   path: paths.dashboard.candidate.demo.details,
            //   // },
            //   // { title: t('create'), path: paths.dashboard.candidate.new },
            //   // { title: t('edit'), path: paths.dashboard.candidate.edit },
            // ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
