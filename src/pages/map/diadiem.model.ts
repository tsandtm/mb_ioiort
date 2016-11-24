export class DiaDiem {
  DiemQuanTracID: number;
  TenGoi: string;
  KyHieu: string;
  DiaChi: string;
  LoaiDiDong: boolean;
  map_lat: string;
  map_long: string;
  NguoiPhuTrach: string;
  GhiChu: string;
  listThongSoDo: Array<{
    valueOld: number,
    chartEntry: string,
    ThongSoID: number,
    DiemQuanTracID: number,
    DoDo_Name: string,
    DoDo_ID: string,
    DonViTinh: string,
    Min1: number,
    Min2: number,
    Min3: number,
    Max1: number,
    Max2: number,
    Max3: number,
    StatusMin1: string,
    StatusMin2: string,
    StatusMin3: string,
    StatusMax1: string,
    StatusMax2: string,
    StatusMax3: string,
    ListDiaDiemTracDia: any
  }>;
}
