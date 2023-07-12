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
  const { dataList = [], titles = [], totalTitle = [], contentName = '' } = props;
  return (
    <>
      <div className={styles.leftWrap}>
        <div className={styles.title}>
          <div className={styles.tag}><span>{titles && titles[0].storeName}</span></div>
        </div>
        <div className={styles.content}>
          {dataList && dataList.length > 0 &&
            dataList.map((item, index) => {
              return (
                <div className={styles.list} key={index}>
                  {
                    
                    item[contentName].map((_item, _index) => {
                      return (
                        <div key={_index} className={styles.item}>
                          <span className={_item.deptType == 'ALL' ? `${styles.topTitle}` : ''}>{_item.deptType == 'ALL' ? item.rspName : _item.deptType}</span>
                        </div>
                      )
                    })
                  }
                </div>
              );
            })}
        </div>
      </div>
      {
        totalTitle && totalTitle.length > 0 && <div className={styles.totalWrap}>
        <div className={styles.title}>总计</div>
      </div>
      }
      
    </>
  );
});
