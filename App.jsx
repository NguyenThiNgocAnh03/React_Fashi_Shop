import {  Component } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import vnImg from './assets/vn.jpg'
import './App.css'
class App3 extends Component {
  render () {
    return (
      <div>
        <img src="/image/vn.jpg" className="base" width="170" height="179" alt="" />
      </div>
    )
  }
}
function App1() {

  return (
    <>
    <div>
        
          <h1>Welcome Ngọc Anh </h1>
        </div>
        <div className="card">
          <img src="/image/vn.jpg" className="base" width="170" height="179" alt="" />
        </div>
      
    </>
  )
}
function App2() {

  return (
    <>
      <section id="center">
        {/* <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div> */}
        <div className="center">
          <h1>Welcome PNV27</h1>
        </div>
        <div className="card">
          <img src="/image/vn.jpg" className="base" width="170" height="179" alt="" />
        </div>
      </section>
    </>
  )
}
const App4 = () => {
  return (
    <div>
      <h3>Hellooooo</h3> 
    </div>
  )
}
const Giaodien = () => {
  return (
   
      <div>
  
   <title>Anh's Courses</title>
   <meta name="viewport" content="width=device-width, initial-scale =1" />
   <meta charSet="utf-8" />
   <meta name="title" content="Fashion MyLiShop - fashion mylishop" />
   <meta name="description" content="Fashion MyLiShop - fashion mylishop" />
   <meta name="keywords" content="Fashion MyLiShop - fashion mylishop" />
   <meta name="author" content="Hôih My" />
   <meta name="author" content="Y Blir" />
   <link rel="icon" type="image/png" href="../images/logohong.png" />
   {/* Bootstrap Core CSS */}
   <link href="../css/bootstrap.min.css" rel="stylesheet" />
   <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
   {/* Bootstrap Custom CSS */}
   <link rel="stylesheet" type="text/css" href="css/style.css" />
   {/* button top */}
   <a href="#" className="back-to-top"><i className="fa fa-arrow-up" /></a>
   {/* header */}
   {/*?php include 'model/header.php'; ?*/}
   {/* /header */}
   <div className="container">
      <ul className="breadcrumb">
         <li><a href="../index.php"> Trang chủ </a></li>
         <li> Liên hệ </li>
      </ul>
      {/* /breadcrumb */}
      <div className="row">
         <div className="col-md-12 col-sm-16 col-xs-12">
            <div className="titles">
               <center>
                  <h3><strong> THÔNG TIN LIÊN HỆ </strong></h3>
               </center>
            </div>
            <form name="form-lien-he" action="lienhe_back.php" method="POST" acceptCharset="utf-8">
               <div className="contents">
                  <div className="form-group">
                     <label>Họ và tên: <span style={{color: '#f00'}}>*</span></label>
                     <input name="contact-name" placeholder="Nhập họ tên đầy đủ" className="form-control" required="required" maxLength={255} type="text" id="contact-name" />
                  </div>
                  <div className="form-group">
                     <label>Email: <span style={{color: '#f00'}}>*</span></label>
                     <input name="contact-email" placeholder="Nhập email của bạn" className="form-control" required="required" maxLength={255} type="email" id="contact-email" />
                  </div>
                  <div className="form-group">
                     <label>Tiêu đề: <span style={{color: '#f00'}}>*</span></label>
                     <input name="contact-subject" placeholder="Nhập tiêu đề của bạn" className="form-control" required="required" maxLength={255} type="text" id="contact-subject" />
                  </div>
                  <div className="form-group">
                     <label>Nội dung: <span style={{color: '#f00'}}>*</span></label>
                     <textarea name="contact-content" placeholder="Nhập thông tin cần liên hệ..." className="form-control" id="ContactContent" rows={5} required defaultValue={""} />
                  </div>
                  <center><button type="submit" name="sendcontact" className="btn btn-info"> Gửi liên hệ </button></center>
               </div>
               {/* /content */}
            </form>
         </div>
         {/* /col */}
      </div>
      {/* /row */}
   </div>
   {/* /container */}
   {/* Maps */}
   <div className="container-fluid">
      <div className="row">
         <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.5247181884388!2d108.24206672970746!3d16.060358250494478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421836ed15dfc9%3A0x99c3cc369a33576c!2sPasserelles+num%C3%A9riques+Vietnam!5e0!3m2!1sen!2s!4v1513938605489" width="100%" height={450} frameBorder={0} style={{border: 0}} allowFullScreen padding="0px;" />
         </div>
         {/* /map */}
      </div>
      {/* /row */}
   </div>
```
   {/* /container-fluid */}
</div>
  )
}
export {App1, App2, App3, App4, Giaodien}

