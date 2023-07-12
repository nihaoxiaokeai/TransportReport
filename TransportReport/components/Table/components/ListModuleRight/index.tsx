import * as React from "react";
import * as styles from "./index.scss";

interface IProps {
  dataList: any;
  titles: any;
  totalTitle: any;
  contentName: any;
}
export default React.memo((props: IProps) => {
  // 每个分组的详细列表
  const { dataList = [], titles = [], totalTitle = {}, contentName = '' } = props;
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.title}>
          {
            titles && titles.length > 0 && titles.map((item, index) => {
              return (
                index !== 0 && <div className={styles.item} key={index}>{item.storeName}</div>
              )
            })
          }
        </div>
        <div className={styles.content}>
          {dataList && dataList.length > 0 &&
            dataList.map((item, index) => {
              return (
                <>
                  {
                    item[contentName].map((_item, _index) => {
                      return (
                        <div className={styles.list} key={_index}>
                         {
                            titles.map((_item2, _index2) => {
                              return (
                                _index2 !== 0 && <div key={_index2} className={_item.deptType == 'ALL' ? `${styles.item} ${styles.blod}` : `${styles.item}`}>
                                {_item[_item2.key]}
                                </div>
                              )
                            })
                         }
                        </div>
                      )
                    })
                  }
              </>
              );
            })}
        </div>
      </div>
      <div className={styles.totalWrap}>
            {
              totalTitle && totalTitle.length > 0 && totalTitle.map((item, index) => {
                return (
                  <div key={index} className={styles.list}>
                    {
                      titles.map((_item2, _index2) => {
                        return (
                          _index2 !== 0 && <div className={`${styles.item} ${styles.blod}`} key={_index2}>
                           {item[_item2.key]}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
      </div>
    </>
  );
});
