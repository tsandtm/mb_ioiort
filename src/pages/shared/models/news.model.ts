export interface INews{
        IDTinTuc?:number;
        IDDanhMucSite?:number;
        TieuDe?:string;
        MoTa?:string;
        NoiDung?:string;
        ThoiGianDangTin?:Date;
        URLNews?:string;
        URLThumbImage?:string;
        URLImage?:string;
        ArrayDaXem?:[number];
        ArrayDaXoa?:[number];
        ArrayQuanTam?:number;
        ChuaXem?:boolean;
        Undo?:boolean;
}
