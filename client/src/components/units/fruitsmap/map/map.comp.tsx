import React from "react";
import { InfoBox } from "./map.style";
import { DocumentData } from "firebase/firestore/lite";

// interface IOveralyContentProps {
//   position: DocumentData;
// }

export function infoWindow({ name }: { name: string }) {
  return <InfoBox>{name}</InfoBox>;
}

// export function OverlayContent(props) {
//   return (
//     <div>
//       <div>
//         <div>
//           {props.name}
//           <div title="닫기"></div>
//         </div>
//         <div>
//           <div>
//             {/* <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">  */}
//           </div>
//           <div>
//             <div>{props.address}</div>

//             <div>
//               {/* <a href="https://www.kakaocorp.com/main" target="_blank">
//                 홈페이지
//               </a> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
