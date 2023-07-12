import * as React from "react";
import * as styles from "./index.scss";
interface IProps {
  data: any,
  isTabCheck: any,
  handleCheck: React.MouseEventHandler,

}

const { useState, useEffect } = React

export default React.memo((props: IProps) => {
  const { data, handleCheck, isTabCheck } = props;
  const [isShowMore, setIsShowMore] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    scrollToAnchor('screens')
    isTabCheck && setActiveIndex(0)
  })

  // 显示更多子仓库
  const showMore = () => {
    setIsShowMore(!isShowMore)
  }

  const handleClick = (e) => {
    const { code, index } = e.currentTarget.dataset
    setActiveIndex(+index)
    handleCheck(code)
  }

  const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName)
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { 
          anchorElement.scrollIntoView({block: 'center'})
       }
    }
  }

  return (
    <>
      <div className={styles.subWrap}>
        <div className={isShowMore ? `${styles.moreTitle}` : `${styles.title}`}>
           {
             isShowMore ? (
               <div onClick={showMore}>
                 <div className={styles.topTitle}>
                  <div style={{ width: '90%', textAlign: 'center' }}>全部仓</div>
                   <div style={{ width: '6%' }} onClick={showMore}>
                      {
                        isShowMore ? 
                        <img style={{ width: '20px' }} src={require('assets/images/icon_unfolded_up_gray.png')} />
                        :  
                        <img style={{ width: '20px' }} src={require('assets/images/icon_unfolded_down_gray.png')} />
                      }
                   </div>
                  </div>
                 <div className={styles.item}>
                   {
                    data && data.map((item, index) => {
                      return (
                        <div>
                          <div
                            className={styles.moreText} key={index} 
                            onClick={(e)=>handleClick(e)}
                            data-index={index}
                            data-code={item.storeCode}>{item.storeName}</div>
                          <div className={index === activeIndex ? `${styles.active}` : `${styles.noActive}`}></div>
                        </div>
                      )
                    })
                   }
                 </div>
               </div>
             ) :
             (
              <> 
              <div className={styles.tag}>
                {
                data && data.map((item, index) => {
                    return (
                      <div style={{margin: '0 10px'}}>
                          {
                            index === activeIndex && <div id='screens'></div>
                          }
                        <div className={styles.text} 
                          key={index} 
                          onClick={(e)=>handleClick(e)}
                          data-index={index}
                          data-code={item.storeCode}>{item.storeName}</div>
                        <div className={index === activeIndex ? `${styles.active}` : `${styles.noActive}`}></div>
                      </div>
                    )
                  }) 
                }
                </div>
                {
                  !isShowMore && (
                    <div className={styles.icon} onClick={showMore}>
                      {isShowMore ? 
                        <img style={{ width: '20px' }} src={require('assets/images/icon_unfolded_up_gray.png')} />
                        :  
                        <img style={{ width: '20px' }} src={require('assets/images/icon_unfolded_down_gray.png')} />
                      }
                    </div>
                  
                  )
                }
              </>
             )
          }
        </div>
     
      </div>
    </>
  );
});
