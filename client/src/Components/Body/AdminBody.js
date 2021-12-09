import React, { useState, useEffect } from "react";
import "./body.css";
import List from "./List/List";
import { getAllUsers } from "../../Action/listActions";

export default function AdminBody() {
    const [userData, setuserData] = useState([]);

    useEffect(() => {
        getAllUsers("admin").then((res) => {
            setuserData([...res.data.users]);
        });
    }, []);

    return (
        <div className='body'>
            {userData
                ? userData.map((item) => {
                      if (item.email === "admin") {
                          return <div />;
                      }
                      return (
                          <div style={{ marginBottom: "4rem" }}>
                              <div className='createdby'>
                                  Created by : {item.firstName} {item.lastName}
                              </div>
                              <List itemsList={item.itemsList} />
                          </div>
                      );
                  })
                : null}
        </div>
    );
}
