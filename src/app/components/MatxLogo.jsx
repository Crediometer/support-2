import useSettings from '../hooks/useSettings';

const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    // <svg
    //   width="24px"
    //   height="24px"
    //   className={className}
    //   viewBox="0 0 240 239"
    //   version="1.1"
    //   xmlns="http://www.w3.org/2000/svg"
    //   xmlnsXlink="http://www.w3.org/1999/xlink"
    // >
    //   <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //     <g
    //       id="logo"
    //       transform="translate(120.500000, 98.000000) rotate(-270.000000) translate(-120.500000, -98.000000) translate(-21.000000, -35.000000)"
    //     >
    //       <g
    //         id="Group"
    //         transform="translate(141.500000, 133.000000) rotate(90.000000) translate(-141.500000, -133.000000) translate(9.000000, -8.000000)"
    //       >
    //         <g
    //           id="Path-4-Copy"
    //           transform="translate(132.242532, 149.243361) rotate(-135.000000) translate(-132.242532, -149.243361) translate(38.742532, 55.743361)"
    //         >
    //           <g id="path-1-link" fill="#000000">
    //             <polygon
    //               id="path-1"
    //               points="136.269985 0.8695976 186.615824 50.367072 186.615824 186.98041 50.7100649 186.98041 0.4346189 136.704964"
    //             ></polygon>
    //           </g>
    //           <g id="path-1-link" fill={theme.palette.primary.light}>
    //             <polygon
    //               id="path-1"
    //               points="136.269985 0.8695976 186.615824 50.367072 186.615824 186.98041 50.7100649 186.98041 0.4346189 136.704964"
    //             ></polygon>
    //           </g>
    //         </g>
    //         <polygon
    //           id="Path-3"
    //           fill={theme.palette.primary.light}
    //           points="13 238.415212 13 0 249.898437 238.415212"
    //         ></polygon>
    //         <polygon
    //           id="Path-4"
    //           fill={theme.palette.primary.main}
    //           points="252.486992 0 252.486992 238.799226 13 238.799226"
    //         ></polygon>
    //       </g>
    //     </g>
    //   </g>
    // </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 149.999 121.106">
  <g id="Group_215" data-name="Group 215" transform="translate(-190.143 -297.032)">
    <g id="Group_118" data-name="Group 118" transform="translate(190.143 297.032)">
      <path id="Path_368" data-name="Path 368" d="M189.152,997.252c-14.668-1.476-60.567-11.755-69-49.252L89,957.654S125.521,1008.223,189.152,997.252Z" transform="translate(-89 -877.703)" fill="#b11226"/>
      <path id="Path_369" data-name="Path 369" d="M216.887,918.089c-15.078-5.449-67.316-37.1-32.648-96.347L134,844.428s1.317,16.237,3.511,23.258l15.8-4.827S154.11,910.244,216.887,918.089Z" transform="translate(-114.253 -802.656)" fill="#b11226"/>
      <g id="Group_117" data-name="Group 117" transform="translate(64.97)">
        <path id="Path_370" data-name="Path 370" d="M288.345,893.276c-19.341,0-35.02-16.181-35.02-36.141s15.679-36.141,35.02-36.141a34.1,34.1,0,0,1,19.586,6.177l11.044-16.894a52.98,52.98,0,0,0-30.627-9.739c-30.046,0-54.4,25.137-54.4,56.145s24.357,56.145,54.4,56.145a52.963,52.963,0,0,0,30.12-9.387l-10.582-16.311A34.1,34.1,0,0,1,288.345,893.276Z" transform="translate(-233.945 -800.537)" fill="#b11226"/>
      </g>
    </g>
  </g>
</svg>

  );
};

export default MatxLogo;
