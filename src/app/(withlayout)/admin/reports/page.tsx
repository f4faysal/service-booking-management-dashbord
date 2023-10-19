"use client";
import Loading from "@/app/loading";
import { useBookingsQuery } from "@/redux/api/bookingApi";
import { Col, Progress, Row, Space } from "antd";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };

const Rreports = () => {
  const { data, isLoading } = useBookingsQuery({});
  const bookings = data?.data;

  const panding = bookings?.filter((item: any) => item.status === "pending");
  const accepted = bookings?.filter((item: any) => item.status === "accepted");
  const rejected = bookings?.filter((item: any) => item.status === "rejected");

  if (isLoading) return <Loading />;
  return (
    <Row>
      <Col span={24}>
        <div
          style={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            margin: "20px",
            borderRadius: "10px",
            gap: "20px",
          }}
        >
          <h1> Total Booking {bookings?.length}</h1>
          <Space wrap>
            <Progress
              type="dashboard"
              percent={bookings?.length}
              strokeColor={twoColors}
              format={(percent) => `${percent} Total`}
            />
          </Space>
        </div>

        <div
          style={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            margin: "20px",
            borderRadius: "10px",
            gap: "20px",
          }}
        >
          <h1> Total accepted {accepted?.length}</h1>
          <Progress
            type="circle"
            percent={accepted?.length / bookings?.length}
            status="success"
            format={(percent) => `${percent} Done`}
          />
        </div>
        <div
          style={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            margin: "20px",
            borderRadius: "10px",
            gap: "20px",
          }}
        >
          <h1> Total panding {panding?.length}</h1>
          <Space wrap>
            <Progress
              type="circle"
              percent={panding?.length / bookings?.length}
            />
          </Space>
        </div>
        <div
          style={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            margin: "20px",
            borderRadius: "10px",
            gap: "20px",
          }}
        >
          <h1> Total rejected {rejected?.length}</h1>
          <Space wrap>
            <Progress
              type="circle"
              percent={rejected?.length / bookings?.length}
              status="exception"
              format={(percent) => `${percent} rejected`}
            />
          </Space>
        </div>
      </Col>
    </Row>
  );
};

export default Rreports;
