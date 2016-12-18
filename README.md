Phần nhánh bebinh-dev-login-facebook làm chức năng login bằng Facebook.

Trước khi chạy app nên install những phần sau, ta mở command trong thư mục mb_ioiort:

*Cài đặt:*

1/ ionic plugin add cordova-plugin-facebook4 --variable APP_ID="1576863542330748" --variable APP_NAME="Login_Ionic" //Tài khoản cho app.

2/ cordova plugin add --save cordova-plugin-inappbrowser 

3/ cordova plugin add --save cordova-plugin-whitelist

Chú ý: 2/ và 3/ dùng để làm app mình chạy Facebook tốt cho mọi cấu hình và nó tránh trường hợp bị lỗi về network (port không chính xác với mạng hiện tại do xài máy ảo, ...).

*Trường hợp* máy mình bị màn hình trắng là do không load được index.html, main.ts, ... do app cấu hình cao hoặc load không kịp thì ta dùng:

preference name="loadUrlTimeoutValue" value="700000"  //bỏ này vô config.xml nhớ bỏ vô < />. Trong đó value là thời gian trễ giống như setTimeout.

*add thư viện để sài:* import { Facebook } from 'ionic-native'; // chúng ta làm login facebook ở đâu ta bỏ ở đó.

*Chỉnh sửa:* Chúng ta sửa lại 3 file:

1/ login-page => login-page.ts: bạn chỉ cần dán đè hàm LoginFacebook().

2/ shared => services => login-page.service.ts: bạn cũng dán đè GetCountFacebook và InserUserFacebook. 

3/ shared => variables.ts: thêm biến urlLoginFace.


Sau khi xong các bước trên các bạn chạy app là ok bấm vô nút icon Facebook thì các bạn nhập tài khoản Facebook thành công sẽ vô được app tức là thành công rồi đó nha.

Có 1 điều ai đọc bài viết này: ai dám lấy ID_APP mà đi quậy hoặc phá Facebook là tui giấu dép cho kiếm chết cha luôn.


