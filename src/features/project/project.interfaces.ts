export interface ElementProps {
  readonly id: string;
  readonly color: string;
  readonly rotation: number;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface ProjectProps {
  readonly id: string;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly items: ElementProps[];
}

export interface Init {
  readonly id: string;
  readonly name: string;
  modyfied: number;
}

export interface ApiResponse {
  readonly project?: ProjectProps;
  readonly init?: Init;
  errMsg?: string;
}
