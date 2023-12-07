"use client";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { loginSchema } from "@/schemas/login";
import { storeUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res: any = await userLogin({ ...data });
      console.log(res);

      if (res?.data?.accessToken) {
        router.push("/");
        message.success("User Login Success");
        storeUserInfo({ accessToken: res?.data?.accessToken });
      } else {
        message.error("User Login Fail try again later");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row
      align={"middle"}
      justify={"center"}
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <Col span={5}>
        <div
          style={{
            padding: "80px 20px 40px 20px",
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "120px",
              borderRadius: "20px",
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "absolute",
              top: "-70px",
              backgroundColor: "green",
              color: "white",
              padding: "0 10px",
            }}
          >
            <small>Admin</small>

            <h1 style={{ fontSize: "2.5rem" }}>Sign In</h1>
          </div>

          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <>
              <div>
                <FormInput
                  name="email"
                  type="email"
                  size="large"
                  placeholder="Enter your email"
                  label="User Email"
                />
              </div>
              <div
                style={{
                  margin: "15px 0",
                }}
              >
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  placeholder="password"
                  label="User Password"
                />
              </div>
              <Button
                style={{
                  width: "100%",
                  margin: "15px 0",
                }}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>

              <div>
                <p>Admin</p>
                <p>
                  email :{" "}
                  <span
                    style={{
                      color: "green",
                    }}
                  >
                    admin@gmail.com
                  </span>
                </p>
                <p>
                  password :{" "}
                  <span
                    style={{
                      color: "green",
                    }}
                  >
                    123456Aa
                  </span>
                </p>
              </div>
              {/* <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Don`t have an account? &nbsp;
                <Link
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  href="/register"
                >
                  Sign up
                </Link>
              </p> */}
            </>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
