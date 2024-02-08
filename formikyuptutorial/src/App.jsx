import { useState } from "react";
import "./App.css";

//import * as Yup from 'yup';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage,FieldArray } from "formik";
//import kErrorMessage from "./kErrorMessage";
import KErrorMessage from "./components/KErrorMessage";


let validationSchema = Yup.object({
  // custum message to write  what u wont message inside to the required otherwise it will take as bidefault
  name:Yup.string().required("name required hai !"),
  phone:Yup.number()
  .min(1000000000, "not valid phone number ")
  .max(9999999999," not valid phone number")
  .required("phone required hai!"),
  password:Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,15}$/gm, "Must Contain 8 to 15 character one*(uppercase,Lowecase,number,symbol) ").required("password required hai!"),
  // gender:Yup.string().required("gender required hai") ,
  // if ofter array no need to give the the message becoz we r require messsage show alway not inside array not condition
  gender:Yup.string().oneOf(["male", "female","other"], "take one of them as a gender").required("Take one of them as a gender"),
  date:Yup.date().required(" Date is required"),
  income:Yup.string().required("income is required"),
  // object validation methods
  SocialMedia: Yup.object().shape({

    FaceBook:Yup.string().required("facebook name is required"),
    Twitter:Yup.string().required("Twitter name is required"),
    Linkedin:Yup.string().required("Linkedin name is required"),

  }),
  about:Yup.string().min(50,"50 character is required").required("About is required"),

})

function App() {

const [formData,SetFormData]=useState('');  
  return (
    <>
      <div className="ctn">
        <Formik
        validationSchema={validationSchema}
           initialValues={{
             name: "", 
             phone: "",
              password: "",
               gender: "",
               date:"", 
               income:"",
               about:"",
               SocialMedia:{
                FaceBook:"",
                Twitter:"",
                Linkedin:"",
               },
               programmingLag:[],
               hobbies:[],
            }}
          onSubmit={(values) => {
            console.log(values);
            SetFormData(values);
            // console.log(state)
            console.warn()
            alert("success!");  
            
          }}
        >
          {/* the most imp thing to the match in initialvalues 
   name inside field name of all field */}


         {({values})=>(
        

        <Form>

        <label>NAME:</label>
        <Field className='int1' type="text" name="name"></Field>
        <br />
       {/* <ErrorMessage name='name'/> */}
    <KErrorMessage name='name' />
        <br />
        <label>PHONE:</label>
        <Field className='int1' type="number" name="phone"></Field>
        <br />
    <KErrorMessage name='phone' />

        <br />
        <label>Password:</label>
        <Field className='int3' type="password" name="password"></Field>
        <br />
    <KErrorMessage name='password' />

        <br />
        {/* <label>gender:</label>
        <Field type='radio' name="gender"></Field> */}
        <label>Gender:</label>
        <Field className='radio-btn' type="radio" name="gender" value="male" /> Male
        <Field className='radio-btn' type="radio" name="gender" value="female" /> Female
        <Field className='radio-btn' type="radio" name="gender" value="other" /> Other
        <br />
    <KErrorMessage name='gender' />

        <br />
        <label>DATE:</label>
        <Field className='date-btn' type='date' name="date" />
        <br/>
        <KErrorMessage name='date' />
        <br />
        <label>INCOME:</label>
       <Field className='dropdown-btn' name='income' as="select">
        <option value='0'>RS= 0</option>
        <option value='10000'>rs 10000</option>
        <option value='20000'>rs 20000</option>
       </Field>
        <br/>
        <KErrorMessage name='income' />

        <br />
        <label>ABOUT:</label>
        {/* it take as the type-->textarea and take as='textarea' */}
        <Field className='about' as='textarea' name="about" />
        <br/>
        <KErrorMessage name='about' />

        <br />
        {/* to store nested object */}
        <label>SocialMedia:</label>
        <br></br>
        <br></br>
        <label>FaceBook:</label>

        <Field className='int1' type="text" name="SocialMedia.FaceBook"></Field>
        <br></br>
        <KErrorMessage name='SocialMedia.FaceBook' />

        <br></br>
        <label>Twitter:</label>

        <Field className='int2' type="text" name="SocialMedia.Twitter"></Field>
        <br></br>
        <KErrorMessage name='SocialMedia.Twitter' />

        <br></br>
        <label>Linkedin:</label>
        <Field className='int1' type="text" name="SocialMedia.Linkedin"></Field>
        <br></br>
        <KErrorMessage name='SocialMedia.Linkedin' />

        <br></br>

        {/* To store array value giving to the index of the perticuler element   */}

        <label>programming:</label>
        <br></br>
        <br></br>
        <label>DSA</label>
        <Field className='int4' type="text" name="programmingLag[0]"></Field>
        <br></br>
        <br></br>
        <label>JAVASCRIPT:</label>
        <Field className='int5' type="text" name="programmingLag[1]"></Field>
        <br></br>
        <br></br>




            //Add Here Hobbies


            <FieldArray
         name="hobbies"
         render={arrayHelpers => (
           <div>
             {values.hobbies && values.hobbies.length > 0 ? (
               values.hobbies.map((hobby, index) => (
                 <div key={index}>
                   <Field className="btnLastSecond" name={`hobbies.${index}`} />
                   <button
                   className="minus"
                     type="button"
                     onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                   >
                     -
                   </button>
                   <button
                   className="plus"
                     type="button"
                     onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                   >
                     +
                   </button>
                 </div>
               ))
             ) : (
               <button className="btnLastSecond" type="button" onClick={() => arrayHelpers.push('')}>
                 {/* show this when user has removed all hobbies from the list */}
                 Add a hobbies
               </button>
             )}
             
           </div>
         )}
       />




        <button  className="BTN-FINAL" type="submit">submit</button>
      </Form>


         )}
      
        </Formik>
      </div>
    </>
  );
}

export default App;
