<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:26
 * @LastEditTime: 2021-08-09 14:14:44
 * @Description: 
 * @FilePath: \dee-ui\packages\remark.md
-->
## 公共 mixins
## utils 功能工具方法
## 公用组件
### control 非矩阵题基本控件
### matrix-control 非矩阵题基本控件

## 题型说明

### desp 文本描述/段落说明

### short-text 短文本

### long-text 长文本

### single-choice 单项选择

### single-dropdown 下拉单选

### multiple-choice 多项选择

### multiple-dropdown 下拉多选

### matrix-single-choice 矩阵单选

### matrix-single-dropdown 矩阵下拉单选

### matrix-multiple-choice 矩阵多选

### matrix-multiple-dropdown 矩阵下拉多选

### matrix-input 矩阵填空

### matrix-complex 复合矩阵

### matrix-complex-list 自增型复合矩阵


## 题型参数说明

### dimData 题型数据
### isEditing 题型是否编辑
### realTime 是否实时交互、可用于控制、是否及时清空
### fieldTemp  一个组题型的模板

### metaTemplate 所有的模板数据
#### relationIds 用于控制关联题的局部变量（一个模板一个变量）
#### relation_dict 关联题关联了多少道题的数据和判断显示依据
#### relation_keys 当前题型被多少道题关联的id list
#### calculation_dict 用于判断计算赋值题
#### calculation_keys 当前题型和哪道题一起计算赋值id list
#### constants_dict 全局常量（表达式计算常量用于计算赋值）

### customQuestionId 自定义题型id（用于滚动条定位）
### poperContents 日志气泡数据
### showLog 控制日志气泡的显示