// pages/about/setting/setting.js
import create from '../../../utils/create';
import {store} from '../../../store/store';
import {updateStorage} from '../../../store/action/index.js';

create(store,{

  onCheckAllChange(e){
    store.data.setting.allowCheckAll = e.detail.value;
    updateStorage()
  },

  onClearAllChange(e){
    store.data.setting.allowClearAll = e.detail.value
    updateStorage()
  },

  onShowTimeChange(e){
    store.data.setting.showLogTime = e.detail.value
    updateStorage()
  },
})