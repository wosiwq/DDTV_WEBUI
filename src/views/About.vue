<template>
  <div class="m-10 flex justify-center">
    <ElCard style="--el-card-padding: 0; width: 60%; min-width: 300px">
      <div class="card-body flex flex-col divide-y dark:divide-[#4C4D4F]">
        <div>
          <span>当前WEBUI版本</span>
          <span>&nbsp;{{ version }}</span>
        </div>
        <div>
          <span>最新WEBUI版本</span>
          <span>&nbsp;</span>
        </div>
        <div>
          <span>当前DDTV版本</span>
          <span>&nbsp;</span>
        </div>
        <div>
          <span>最新DDTV版本</span>
          <span>&nbsp;</span>
        </div>
        <div>
          <span>DDTV项目主页</span>
          <span>
            <a
              class="text-blue hover:cursor-pointer hover:text-blue-600"
              href="https://github.com/CHKZL/DDTV"
              target="_blank">
              https://github.com/CHKZL/DDTV
            </a>
          </span>
        </div>
        <div>
          <span>WEBUI项目主页</span>
          <span>
            <a
              class="text-blue hover:cursor-pointer hover:text-blue-600"
              href="https://github.com/wosiwq/DDTV_WEBUI"
              target="_blank">
              https://github.com/wosiwq/DDTV_WEBUI
            </a>
          </span>
        </div>
        <div>
          <span>WEBUI问题反馈</span>
          <span>
            <a
              class="text-blue hover:cursor-pointer hover:text-blue-600"
              href="https://github.com/wosiwq/DDTV_WEBUI/issues"
              target="_blank">
              https://github.com/wosiwq/DDTV_WEBUI/issues
            </a>
          </span>
        </div>
        <div>
          <span>官方文档</span>
          <span>
            <a
              class="text-blue hover:cursor-pointer hover:text-blue-600"
              href="https://ddtv.pro"
              target="_blank">
              https://ddtv.pro
            </a>
          </span>
        </div>
        <div>
          <span>联系方式</span>
          <span>
            <a
              class="text-blue hover:cursor-pointer hover:text-blue-600"
              href="mailto:wosiwq1@gmail.com">
              wosiwq1@gmail.com
            </a>
          </span>
        </div>
        <div>
          <span>DDTV官方QQ群</span>
          <span>
            <a
              class="text-blue hover:cursor-pointer hover:text-blue-600"
              href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=dDdLgOe61zg4kWi3aSR-LjYm5DzlVluj&authKey=qI9klUAhs2o5e%2BTun%2Fiwc8DBqDAfe%2Fikn%2BZBoFFsbbsxxQDoTSKVzqrbYSvEDVi%2F&noverify=0&group_code=338182356"
              target="_blank">
              蒂蒂媞薇早饭食堂
            </a>
          </span>
        </div>
      </div>
    </ElCard>
  </div>
</template>
<script lang="ts" setup>
import { version } from '@/../package.json'
</script>
<style scoped lang="scss">
.card-body {
  div {
    padding: 10px;
    padding-left: 20px;
    span:first-of-type {
      width: 8rem;
      display: inline-block;
    }
    span + span::before {
      content: '：';
    }
  }
}
</style>
