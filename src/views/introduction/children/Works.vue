<template>
  
    <div class="studio-done">
      <p>主要成就</p>
      <ul>
        <li>
          <span>国家海洋局南海分局北斗航标系统</span>
          <div>
            该航标系统主要用于将北斗卫星传来的航标数据标注在地图上，并显示航标所在海域的水文情况
          </div>
        </li>
        <li>
          <span>广州市供电局运营分析平台</span>
          <div>
            该平台主要用于管理广州市各地用电、电路维护、人员分配等的多项数据。对数据进行清洗和分析，实现数据可视化管理，解决了人工处理大量数据时的无法预测的错误、降低了人力资本，提高了数据处理速率和准确性
          </div>
        </li>
        <li>
          <span>国家海洋局南海分局北斗航标系统</span>
          <div>
            该航标系统主要用于将北斗卫星传来的航标数据标注在地图上，并显示航标所在海域的水文情况
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Works'
}
</script>

<style lang="scss">

.studio-done ul {
  padding: 0;
  display: flex;
  justify-content: space-around;
  li {
    /* flex: 1; */
    /* margin-right: 8px; */
    width: 220px;
    padding: 2px 8px;
    line-height: 25px;
    border: 1px solid #fff;
    span {
      width: 100%;
      text-align: center;
      font-weight: 700;
    }
  }
}

</style>