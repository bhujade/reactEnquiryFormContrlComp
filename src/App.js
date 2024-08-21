
import './App.css';
import {Col, Container, Form, Row, Table} from 'react-bootstrap'; 
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {
  let[formData,setFormData] = useState({

    uname:'',
    uemail:'',
    uphone:'',
    umessage:'',
    index:''

  })


  let getValue = (event)=>{
    let oldData = {...formData}
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData)
  }

  let[userData,setUserData] = useState([]);

  let handleSubmit = (event)=>{

    let currentUserFormData = {
      uname:formData.uname,
      uphone:formData.uphone,
      uemail:formData.uemail,
      umessage:formData.umessage
    }

    if(formData.index ===""){

  

    let checkUserData = userData.filter((v)=>v.uemail == formData.uemail || v.uphone == formData.uphone)

    if(checkUserData.length == 1){
      // alert("email or phone alerdy exist")
      toast.error("email or phone alerdy exist")
    


    }else{
      let oldUserData =[...userData,currentUserFormData]
      setUserData(oldUserData)
      setFormData(
        {
  
          uname:'',
          uemail:'',
          uphone:'',
          umessage:'',
          index:''
      
        })
      
      }
  
      }
     else {
          let editIndex = formData.index;
          let oldData = userData;

          let checkUserData = userData.filter((v,i)=>(v.uemail == formData.uemail ||
           v.uphone == formData.uphone) && i!= editIndex)

          if(checkUserData.length==0){

          oldData[editIndex]['uname'] = formData.uname
          oldData[editIndex]['uemail'] = formData.uemail
          oldData[editIndex]['uphone'] = formData.uphone
          oldData[editIndex]['umessage'] = formData.umessage

          setUserData(oldData)
          setFormData({
            uname:'',
            uemail:'',
            uphone:'',
            umessage:'',
            index:''
          })
        }
        else{
          toast.error("email or phone alerdy exist")
        }
      }
      event.preventDefault();

   
  }

  let deleteRow = (indexNum)=>{
     let filterDataAfterDelete = userData.filter((v,i)=> i!= indexNum)
     toast.success("data deleted")
     setUserData(filterDataAfterDelete)
  }

  let editRow = (indexNum)=>{
    // alert(indexNum);
    let editData = userData.filter((v ,i)=>i==indexNum)[0];
    // console.log(editData)
    editData['index'] = indexNum;
    // console.log(editData)
    setFormData(editData)
  }

  return (
  <Container fluid>
    <Container>
      <Row>
        <Col className='text-center py-5'>
          <h1>Enquiry Form</h1>
        </Col>
      </Row> 
      <Row>
        <Col lg={5}>
    <ToastContainer />
    <NotificationContainer/> 
        {userData.length}
        <Form onSubmit={handleSubmit}>
          <div className='pb-3'>
            <label className='form-label'>Name</label>
            <input type='text' onChange={getValue} value={formData.uname} name='uname' className='form-control'/>
          </div>
          <div className='pb-3'>
            <label className='form-label'>Email</label>
            <input type='email' onChange={getValue} value={formData.uemail} name='uemail' className='form-control'/>
          </div>
          <div className='pb-3'>
            <label className='form-label'>Phone</label>
            <input type='text' onChange={getValue} value={formData.uphone} name='uphone' className='form-control'/>
          </div>
          <div className='mb-3'>
            <label for="" className='form-label'>Message</label>
            <textarea type='text' onChange={getValue} value={formData.umessage} className='form-control' name='umessage' id='' row='3'></textarea>
          </div>
          
          <button className='btn btn-primary'>{
            
            formData.index !== ""?  "update" : "save" 
            }</button>
        </Form>
        </Col>
        <Col lg={7}>


    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th> Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

        {userData.length >= 1 ?   


          userData.map((obj,i)=>{
            return(
              <tr key={i}>
              <td>{i +1}</td>
              <td>{obj.uname}</td>
              <td>{obj.uemail}</td>
              <td>{obj.uphone}</td>
              <td>{obj.umessage}</td>
              <td>
                <button onClick={()=>deleteRow(i)}>Delete</button>
                <button onClick={()=>editRow(i)}>Update</button>
              </td>
            </tr>
            )
          })
       

        :
        <tr>
        <td colSpan={6}> No data found </td> 
        
        </tr>
          }
      </tbody>
    </Table>



        </Col>
      </Row>
    </Container>
  </Container>
  );
}

export default App;
