<template>
<div class="app-container">
  <!-- 筛选条件 -->
  <div class="filter-container">
    <div class="filter-params">
      <div class="filter-item">
        <label class="filter-label">{{$t('filter.name')}}</label>
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" :placeholder="$t('filter.name')" v-model="listQuery.name">
        </el-input>
      </div>

      <div class="filter-item">
        <label class="filter-label">{{$t('filter.orderNo')}}</label>
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" :placeholder="$t('filter.orderNo')" v-model="listQuery.orderNo">
        </el-input>
      </div>
      
      <div class="filter-item">
        <label class="filter-label">{{$t('filter.orderStatus')}}</label>
        <el-select  clearable style="width: 105px" class="filter-item" v-model="listQuery.orderStatus" :placeholder="$t('filter.orderStatus')">
          <el-option v-for="item in orderStatusList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label class="filter-label">排序</label>
        <el-select @change='handleFilter' style="width: 105px" class="filter-item" v-model="listQuery.sort">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
          </el-option>
        </el-select>
      </div>
      
    </div>

    <div class="filter-date">
      <div class="filter-item">
        <label class="filter-label">开始时间</label>
        <el-date-picker type="date" placeholder="开始时间" style="width: 150px;" v-model="listQuery.startDate"></el-date-picker>
      </div>
      <div class="filter-item">
        <label class="filter-label">结束时间</label>
        <el-date-picker type="date" placeholder="结束时间" style="width: 150px;" v-model="listQuery.endDate"></el-date-picker>
      </div>
    </div>

    <div class="buttons-view">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('filter.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('filter.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('filter.export')}}</el-button>
    </div>
  </div>
  
  <div class="table-container">
    <h1>订单查询</h1>
    <el-table :data="dataList" border fit highlight-current-row style="width: 100%;min-height:1000px;">
      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  name: 'queryOrders',
  data() {
    return {
      downloadLoading: false,
      dataList: null,
      listLoading: true,
      listQuery: {
        title: undefined,
        name: '',
        orderNo: '',
        importance: undefined,
        orderStatus: undefined,
        sort: 'default',
        startDate: undefined,
        endDate: undefined
      },
      orderStatusList: [1, 2, 3],
      sortOptions: [{ label: this.$t('filter.sortDefault'), key: 'default' }, { label: this.$t('filter.sortTime'), key: 'time' }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleFilter() {
      console.log('search list', 'listQuery == ', this.listQuery)
    },
    handleCreate() {
      console.log('add order')
    },
    handleDownload() {
      this.downloadLoading = true
      console.log('download orders')
      setTimeout(() => {
        this.downloadLoading = false
      }, 2000)
    },
    getList() {
      this.listLoading = true
      // Just to simulate the time of the request
      setTimeout(() => {
        this.dataList = [{id: 1}]
        this.listLoading = false
      }, 1.5 * 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

.filter-params {

}

.filter-item {
  .filter-label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}



</style>
