import * as React from "react";
import * as qs from "query-string";
import * as styles from "./index.scss";
import Table from "./components/Table";
import SubTitle from "./components/SubTitle";
import * as api from "../../services/transportReport";
import BroswerHistory from "@utils/history";
import { withRouter } from "react-router-dom";

const { useState, useEffect } = React;

export default withRouter(
  React.memo(() => {
    const [error, setError] = useState(null);
    const [msgid, setMsgid] = useState(null);
    const [titles, setTitles] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [subTitle, setSubTitle] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isTabCheck, setIsTabCheck] = useState(true);

    useEffect(() => {
      const params = qs.parse(window.location.search);
      const { msgid } = params;
      // const msgid = "2f29a855-3ec2-4933-954b-7f635e9b7197";
      document.title = "日推报表";
      setMsgid(msgid);
      getLogTab(msgid);
    }, []);

    const subTitles = { storeCode: "ALL", storeName: "全部" };

    const getLogTab = (msgid) => {
      const p = Promise.race([
        api.getLogTabController({ msgid }, true).then((res: any) => {
          setTitles(res);
          getPlantOrderDailyMainData(msgid);
        }),
      ]);
      p.then((res) => {
        // console.log(res);
      }).catch((err) => {
        setError(err.message);
      });
    };

    /**
     * 获取门店要货满足率主界面的数据
     * @param msgid
     */
    const getPlantOrderDailyMainData = (msgid) => {
      setLoading(true);
      const p = Promise.race([
        api.getPlantOrderDailyController({ msgid }, true).then((res: any) => {
          setLoading(false);
          res.logisticStores.unshift(subTitles);
          setSubTitle([...res.logisticStores]);
          const data = res.fOutOrderResDTOS;
          data.sort((a, b) => {
            return a.sort - b.sort;
          });
          setTableData(data);
        }),
      ]);
      p.then((res) => {
        setLoading(false);
        // console.log(res);
      }).catch((err) => {
        setLoading(false);
        // setError(err.message)
      });
    };

    /**
     * 获取常温仓断货率主界面的数据
     * @param msgid
     */
    const getNtWareHouseDailyMainData = (msgid) => {
      setLoading(true);
      const p = Promise.race([
        api.getNtWareHouseDailController({ msgid }, true).then((res: any) => {
          setLoading(false);
          res.storeNames.unshift(subTitles);
          setSubTitle([...res.storeNames]);
          const data = res.fOutStockResDTOS;
          data.sort((a, b) => {
            return a.sort - b.sort;
          });
          setTableData([...data]);
        }),
      ]);
      p.then((res) => {
        setLoading(false);
        // console.log(res);
      }).catch((err) => {
        setLoading(false);
      });
    };

    /**
     * 获取门店要货满足率所选仓库的数据
     * @param storeCode
     */
    const getPlantOrderCheckStoreData = (storeCode) => {
      setLoading(true);
      const p = Promise.race([
        api
          .getPlantOrderCheckStoreDataController({ msgid, storeCode }, true)
          .then((res: any) => {
            res ? setTableData([{ ...res }]) : setTableData(null);
          }),
      ]);
      p.then((res) => {
        setLoading(false);
        // console.log(res);
      }).catch((err) => {
        setLoading(false);
      });
    };

    const getNtWareHouseCheckStoreData = (storeCode) => {
      const p = Promise.race([
        api
          .getNtWareHouseCheckStoreController({ msgid, storeCode }, true)
          .then((res: any) => {
            res ? setTableData([{ ...res }]) : setTableData(null);
          }),
      ]);
      p.then((res) => {
        // console.log(res);
      }).catch((err) => {
        setTableData([]);
      });
    };

    /**
     *
     * @param index 切换tab
     */
    const tabClick = (index) => {
      setTabIndex(index);
      setIsTabCheck(true);
      setTableData(null);
      if (index === 1) {
        getNtWareHouseDailyMainData(msgid);
      } else {
        getPlantOrderDailyMainData(msgid);
      }
    };

    const handleCheck = (code) => {
      setIsTabCheck(false);
      if (tabIndex === 1) {
        code === "ALL"
          ? getNtWareHouseDailyMainData(msgid)
          : getNtWareHouseCheckStoreData(code);
      } else {
        code === "ALL"
          ? getPlantOrderDailyMainData(msgid)
          : getPlantOrderCheckStoreData(code);
      }
    };

    return error ? (
      <div className={styles.noData}>
        <img
          style={{ width: "50px" }}
          src={require("assets/images/icon_nodata.png")}
        />
        <div className={styles.nodataTips}>加载过程中开小差了，请稍后刷新~</div>
      </div>
    ) : (
      <div className={styles.contents}>
        <div className={styles.topWrap}>
          <div className={styles.tab}>
            {titles &&
              titles.map((item, index) => {
                const active = index === tabIndex && true;
                return (
                  <div
                    key={index}
                    onClick={() => tabClick(index)}
                    className={
                      active
                        ? `${styles.item} ${styles.active}`
                        : `${styles.item}`
                    }
                  >
                    {item.tabName}
                  </div>
                );
              })}
          </div>
          <div className={styles.subtitle}>
            {subTitle && (
              <SubTitle
                data={subTitle}
                handleCheck={(code) => handleCheck(code)}
                isTabCheck={isTabCheck}
              />
            )}
          </div>
        </div>

        {/* 数据 */}

        {!loading ? (
          <div className={styles.dataWarp}>
            {tableData && tableData.length > 0 ? (
              tableData.map((item, index) => {
                return <Table data={item} index={tabIndex} key={index} />;
              })
            ) : (
              <div className={styles.noData}>
                <img
                  style={{ width: "50px" }}
                  src={require("assets/images/icon_nodata.png")}
                />
                <div className={styles.nodataTips}>暂无数据，请稍后刷新~</div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className={styles.noData}>努力加载中...</div>
          </div>
        )}
      </div>
    );
  })
);
