import { FormComponent } from "@/components/form-component";
import Image from "next/image";
import Source from "../../public/source.png"
import Result from "../../public/result.png"
import Input from "../../public/carbon.png"

export default async function Home() {
  return (
    <div className="h-full mt-10 w-full dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex flex-col gap-10 items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 z-20 rounded-lg bg-gradient-to-b from-neutral-200 to-neutral-500">
        <FormComponent />
      </div>
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl text-bold">HOW IT WORKS</h1>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
          <Image
            src={Source}
            alt=""
            width={1500}
            height={1500}
            className="w-full h-auto max-w-md object-contain object-center"
          />
          <p>Your code</p>
          </div>
          <svg
            fill="#ff2e93"
            version="1.1"
            id="Capa_1"
            height={50}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 45.402 45.402"
            xmlSpace="preserve"
            stroke="#ff2e93"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path
                  d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,
                    1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,
                    1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,
                    0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,
                    4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                ></path>
              </g>
            </g>
          </svg>
          <div className="flex flex-col items-center justify-center">

          <Image
            src={Input}
            alt=""
            width={500}
            height={500}
            className="w-full max-w-md object-contain object-center"
          />
           <p className="-translate-y-10 ">Your Input</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <svg
            fill="#feba43"
            height={90}
            viewBox="0 0 14 14"
            role="img"
            focusable="false"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#feba43"
            transform="rotate(90)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="m 7,8.8385971 c -1.1946,-0.3988 -1.944,-0.4259 -2.39275,-0.086 C 4.1109,9.1274971 4,9.0840971 4,8.5145971 
                c 0,-1.0579 0.98405,-1.2801 3.15745,-0.7131 1.40955,0.3678 1.62595,0.3844 2.0757,0.1596 0.2762,-0.138 0.5617,-0.2799 0.6345,
                -0.3154 0.0728,-0.035 0.13235,0.1783 0.13235,0.4751 0,0.4191 -0.1163,0.5998 -0.52065,0.8088 -0.65705,0.3398 -1.2548,0.3179 -2.47935,
                -0.091 z m 0,-2.647 c -1.1946,-0.3989 -1.944,-0.426 -2.39275,-0.087 C 4.1109,6.4803971 4,6.4370971 4,5.8674971 c 0,-1.0307 1.1159,-1.3118
                 2.9706,-0.7485 1.45335,0.4415 1.9587,0.4654 2.42215,0.1149 0.4989,-0.3774 0.60725,-0.3319 0.60725,0.2546 0,0.4027 -0.12115,0.5875 -0.52065,
                 0.7941 -0.65705,0.3397 -1.2548,0.3178 -2.47935,-0.091 z"
              ></path>
            </g>
          </svg>
          <div className="flex flex-col items-center justify-center">

          <Image
            src={Result}
            alt=""
            width={800}
            height={400}
            className="w-full h-auto max-w-md object-contain object-center"
          />
           <p className="-translate-y-4 ">Result</p>
          </div>
        </div>

      </div>
    </div>
  );
}