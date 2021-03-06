
export interface StateManagerInterface {
  hpButton0: boolean;
  hpButton1: boolean;
  hpButton2: boolean;
  loop: string;
  baseUrl: string;
  videoObj: {
    videoUrl: string,
    autoPlay: number,
    clickPlay: boolean
  };
}