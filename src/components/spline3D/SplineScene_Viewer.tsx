// "use client";

// import React, { useRef } from "react";
// import { useRouter } from "next/navigation";

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "spline-viewer": React.DetailedHTMLProps<
//         React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       > & {
//         url: string;
//       };
//     }
//   }
// }

// const SplineSceneView = () => {
//   const router = useRouter();
//   const splineRef = useRef<any>(null);

//   const routeMap: Record<string, string> = {
//     "button-hub": "/knowledge-hub",
//     "button-estimate": "/estimate",
//     "button-journey": "/about",
//     "button-contact": "/contact",
//   };

//   React.useEffect(() => {
//     const splineViewer = document.querySelector("spline-viewer");

//     if (splineViewer) {
//       splineViewer.addEventListener("mousedown", (event) => {
//         // Handle the event
//         console.log("Mouse down event:", event);
//       });
//     }
//   }, []);

//   return (
//     <>
//       <script
//         src="https://unpkg.com/@splinetool/viewer@1.9.46/build/spline-viewer.js"
//         type="module"
//       />
//       <spline-viewer
//         style={{ width: "100%", height: "100%" }}
//         url="https://prod.spline.design/J-YBMlu-CMGb2bPq/scene.splinecode"
//       />
//     </>
//   );
// };

// export default React.memo(SplineSceneView);
