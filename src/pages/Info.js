import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploader from "./ImageUploader";

function Info() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("user"));
      console.log(data);
      if (data !== []) {
        setUser(data);
      }
    } catch (error) {
      throw error; ///////////////////?
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return <div>loading...</div>;
  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div
          className="card-user user-card-full"
          style={{ background: "rgba(255, 255, 255, 255)" }}
        >
          <div className="">
            <div className="bg-c-lite-green user-profile">
              <div className="card-block text-center text-white">
                <div className="m-b-25">
                  {/* <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        className="img-radius"
                        alt="User-Profile-Image"
                      /> */}
                  <ImageUploader />
                </div>
               
              <h1>some name</h1>
              </div>
            </div>
            <div >
            <div style={{border: "5px solid orange", padding: "20px"}}>
              <div>
                <h6 className="m-b-20 p-b-5 b-b-default f-w-600 content">
                  Information
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Email</p>
                    <h6 className="text-muted f-w-400 content">
                      <a href="/">{user.email}</a>
                    </h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Phone</p>
                    <h6 className="text-muted f-w-400">{user.phone}</h6>
                  </div>
                </div>
                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                  Detalis
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Address</p>
                    <h6 className="text-muted f-w-400">
                      {/* {user.address.street + ", " + user.address.city} */}
                    </h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">company</p>
                    <h6 className="text-muted f-w-400">
                      {/* {user.company.name} */}
                    </h6>
                  </div>
                </div>
                <ul className="social-link list-unstyled m-t-40 m-b-10">
                  <li>
                    <a
                      href="#!"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title=""
                      data-original-title="facebook"
                      data-abc="true"
                    >
                      <i
                        className="mdi mdi-facebook feather icon-facebook facebook"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title=""
                      data-original-title="twitter"
                      data-abc="true"
                    >
                      <i
                        className="mdi mdi-twitter feather icon-twitter twitter"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title=""
                      data-original-title="instagram"
                      data-abc="true"
                    >
                      <i
                        className="mdi mdi-instagram feather icon-instagram instagram"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
