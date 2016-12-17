Phần nhánh bebinh-dev-login-facebook làm chức năng login bằng Facebook.

Trước khi chạy app nên install những phần sau, ta mở command trong thư mục mb_ioiort:
*Cài đặt:*
1/ APP_ID="1576863542330748" --variable APP_NAME="Login_Ionic" //Tài khoản cho app.
2/ cordova plugin add --save cordova-plugin-inappbrowser 
3/ cordova plugin add --save cordova-plugin-whitelist
Chú ý: 2/ và 3/ dùng để làm app mình chạy Facebook tốt cho mọi cấu hình và nó tránh trường hợp bị lỗi về network (port không chính xác với mạng hiện tại do xài máy ảo, ...).

*Trường hợp* máy mình bị màn hình trắng là do không load được index.html, main.ts, ... do app cấu hình cao hoặc load không kịp thì ta dùng:
<preference name="loadUrlTimeoutValue" value="700000"/> //bỏ này vô config.xml. Trong đó value là thời gian trễ giống như setTimeout.

*Chỉnh sửa:*
Chúng ta sửa lại 2 file:
1/ login-page => login-page.ts: bạn chỉ cần dán đè hàm LoginFacebook()
2/ shared => services => login-page.service.ts: bạn cũng dán đè GetCountFacebook và InserUserFacebook. 

Sau khi xong các bước trên các bạn chạy app là ok bấm vô nút icon Facebook thì các bạn nhập tài khoản Facebook thành công sẽ vô được app tức là thành công rồi đó nha.


