<template>
  <div
    class="dee-question-wrap dee-multiple-dropdown"
    :style="questionStyle"
    :type="dimLayout.type"
    :data-value="verifyValue"
  >
    <div class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>
    </div>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">
      <DeeTableSelect class="dee-dropdown-wrap" :input-names="inputNames" :height="dimLayout.options.length*1.8+'rem'">
        <div v-for="(item,index) in dimLayout.options" :key="index" class="dee-dropdown-item">
          <el-checkbox
            v-model="bindTableData[item.option_en_name]"
            :option-en="item.option_en_name"
            :disabled="!isEditing"
            @change="(v)=>{changeCheckboxHandle(v,item)}"
          >
            <span>{{ item.option_name }}</span>
          </el-checkbox>
        </div>
      </DeeTableSelect>
    </div>
  </div>
</template>

<script>
import { commonMixins } from '#/mixins/question-common'
import DeeTableSelect from '#/components/dee-table-select'
export default {
  name: 'DeeMultipleDropdown',
  components: {
    DeeTableSelect
  },
  mixins: [commonMixins],
  data() {
    return {
      bindTableData: {}
    }
  },
  computed: {
    optionCount() {
      return this.dimLayout.line_option_count
    },
    optionMax() {
      return this.dimLayout.option_max_choice
    },
    inputNames() {
      let text = ''
      const arr = []
      for (const k in this.bindTableData) {
        for (const item of this.dimLayout.options) {
          if (k === item.option_en_name && this.bindTableData[k]) {
            arr.push(item)
            break
          }
        }
      }
      text = arr.map(v => v.option_name).join()
      return text
    },
    /* 判断空值（即一道题是否一填）*/
    verifyValue() {
      const data = this.dimData
      const checked = this.dimLayout.options.every(v => {
        return data[v.option_en_name] === '' || data[v.option_en_name] === undefined
      })
      return checked ? 'no_value' : 'value'
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        this.setBindTableData(n)
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    // 渲染绑定数据
    setBindTableData(n) {
      const options = this.dimLayout.options
      const obj = {}
      options.map(v => {
        const key = v.option_en_name
        obj[key] = v.option_value === n[key]
      })
      this.bindTableData = obj
      // console.log(this.bindTableData)
    },
    // 根据绑定的对象装填需要发送的数据
    getTableData(bindTableData) {
      const options = this.dimLayout.options
      const obj = {}
      options.map(v => {
        const key = v.option_en_name
        if (bindTableData[key]) {
          obj[key] = v.option_value
        } else {
          obj[key] = ''
        }
      })
      return obj
    },
    changeCheckboxHandle(val, oItem) {
      /*  排他选项 互斥处理 */
      const options = this.dimLayout.options
      const oItemKey = oItem.option_en_name
      const curOptions = Object.values(this.bindTableData).filter(v => v).length
      let otherObj
      // 选择不是排他项时 有最多选项提示
      if (!oItem.is_exclude_option && this.optionMax && curOptions > this.optionMax) {
        this.bindTableData[oItemKey] = false
        this.$message.warning(`选项不能超过${this.optionMax}`)
        return
      }
      // 选了排他项 清空其他项的值
      if (oItem.is_exclude_option && val) {
        for (const key in this.bindTableData) {
          if (oItemKey !== key) {
            this.bindTableData[key] = ''
          }
        }
      } else {
        //  选其他项 清除排他项的值
        options.forEach(v => {
          if (v.is_exclude_option === 1) {
            this.bindTableData[v.option_en_name] = false
          } else {
            // 勾选了其他这个选项 其他输入框才传
            if (this.bindTableData[v.option_en_name] && v.option_other_is_editable) {
              otherObj = { [v.option_other_en_name]: this.option_other_value }
            }
          }
        })
      }
      const valueObj = this.getTableData(this.bindTableData)
      this.$emit('modify', {
        type: 'multiple_dropdown',
        value: valueObj
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .multiple-dropdown-wrap{
//   // float: left;
//   // width: 50%;
//   width: 100%;
// }
</style>
