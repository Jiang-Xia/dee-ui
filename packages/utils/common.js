// 判断是否未移动端
export function isMobile() {
  const info = navigator.userAgent
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad']
  for (let i = 0; i < agents.length; i++) {
    if (info.indexOf(agents[i]) >= 0) {
      return true
    }
  }
  return false
}

/*
  * 返回值 就是判断多题逻辑的结果 (一道题和多道题控制 一样使用)
*/
export function getMultiQuestionLogic(relation_items, relation, dimData) {
  const boolObj = {}
  for (const k in relation_items) {
    boolObj[k] = isSatisfyCondition(relation_items[k], dimData)
  }
  if (relation === 'and') {
    // 有一个不为true 就返回false
    for (const k in relation_items) {
      if (!boolObj[k]) {
        return false
      }
    }
    return true
  } else if (relation === 'or') {
    // 有一个为true 就返回 true
    for (const k in relation_items) {
      if (boolObj[k]) {
        return true
      }
    }
    return false
  }
}
// 计算关联题是否满足显示条件(只能计算选择题的)
export function isSatisfyCondition(relation_item, dimData) {
  const { any_or_all, checked_or_unchecked, option_list, while_empty } = relation_item
  // 长文本和短文本
  if (while_empty) {
    // console.log(['', undefined, null].includes(dimData[relation_item.r_en_name]))
    // true为有值  false无值
    const bool = ['', undefined, null].includes(dimData[relation_item.r_en_name])
    if (while_empty === 'yes' && !bool) { // 空值
      return true
    } else if (while_empty === 'yes' && bool) { // 有值
      return false
    } else if (while_empty === 'no' && bool) {
      // 无值为true
      return true
    } else if (while_empty === 'no' && !bool) {
      // 无值为true
      return false
    }
  } else {
    // 选择题
    if (checked_or_unchecked === 'checked') {
      if (any_or_all === 'any') {
        return option_list.some((v) => {
          return dimData[v.option_en_name] === v.option_value
        })
      } else if (any_or_all === 'all') {
        return option_list.every((v) => {
          return dimData[v.option_en_name] === v.option_value
        })
      }
    } else if (checked_or_unchecked === 'unchecked') {
      if (any_or_all === 'any') {
        return option_list.some((v) => {
          return dimData[v.option_en_name] !== v.option_value
        })
      } else if (any_or_all === 'all') {
        return option_list.every((v) => {
          return dimData[v.option_en_name] !== v.option_value
        })
      }
    }
  }
}

// 清除关联题数据
export function clearRelationData(id, temp) {
  // 所有的模板
  const { group_list } = temp
  let fieldTemp = []
  group_list.forEach(v => {
    v.items.forEach(v2 => {
      fieldTemp.push(v2)
    })
  })
  fieldTemp = fieldTemp.find(v => v.id === id) || {}
  const itemData = fieldTemp
  const { type, matrix_rows, matrix_cols } = itemData
  const clearObj = { type }
  if (['long_text', 'short_text'].includes(type)) {
    clearObj.value = { [itemData.en_name]: '' }
  } else if (['multiple_choice', 'multiple_dropdown', 'single_choice', 'single_dropdown'].includes(type)) {
    const obj = {}
    itemData.options.forEach(v => { obj[v.option_en_name] = '' })
    clearObj.value = obj
  } else if (['matrix_multiple_choice', 'matrix_input', 'matrix_single_choice'].includes(type)) {
    const obj = {}
    matrix_rows.forEach(row => {
      matrix_cols.forEach(col => {
        const key = row.en_name + '#' + col.en_name
        obj[key] = ''
      })
    })
    clearObj.value = obj
  } else if (['matrix_single_dropdown', 'matrix_multiple_dropdown'].includes(type)) {
    const obj = {}
    matrix_rows.forEach(row => {
      matrix_cols.forEach(col => {
        col.options.forEach(v => {
          const key = row.en_name + '#' + col.en_name + '#' + v.option_en_name
          obj[key] = ''
        })
      })
    })
    clearObj.value = obj
  } else if (['matrix_complex'].includes(type)) {
    const obj = {}
    matrix_rows.forEach(row => {
      matrix_cols.forEach(col => {
        const col_type = col.col_type
        if (col_type === 'short_text') {
          const key = row.en_name + '#' + col.en_name + '#'
          obj[key] = ''
        } else if (['single_dropdown', 'multiple_dropdown'].includes(col_type)) {
          col.options.forEach(v => {
            const key = row.en_name + '#' + col.en_name + '#' + v.option_en_name
            obj[key] = ''
          })
        }
      })
    })
    clearObj.value = obj
  } else if (['matrix_complex_list'].includes(type)) {
    const obj = { [itemData.en_name]: [] }
    clearObj.value = obj
  }
  const other = {
    question_name: itemData.name,
    question_id: itemData.id
  }
  clearObj.other = other
  this.$emit('modify', clearObj)
}

/**
 * @description: 找关联id,初始化时需要把数据中的符合的条件的关联先显示出来
 * @param {Object} params group_list 所有组的模板 relation_dict,relation_keys关联题模板,dimData 数据
 * @return {Array} 控制的关联题显示id列表
 */
export function findRelationIds(params) {
  const { group_list, relation_dict, relation_keys, dimData } = params
  const relationIds = []
  group_list.forEach(v => {
    v.items.forEach(v2 => {
      const id = v2.id
      const ids = relation_keys[id]
      if (ids) {
        for (const id_ of ids) {
          const obj = relation_dict[id_].relation_items
          const relation = relation_dict[id_].relation
          const bool = getMultiQuestionLogic(obj, relation, dimData)
          if (bool && !relationIds.includes(id_)) {
            relationIds.push(id_)
          }
        }
      }
    })
  })
  return relationIds
}
