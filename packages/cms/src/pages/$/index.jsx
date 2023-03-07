// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  ProDialog,
  ProForm,
  Filter,
  ProTable,
} from '@alifd/fusion-ui/lib/index.js';

import {
  P as NextP,
  Page as NextPage,
  Block as NextBlock,
  BlockCell as NextBlockCell,
  RowColContainer as NextRowColContainer,
  Row as NextRow,
  Col as NextCol,
} from '@alifd/pro-layout/lib/index.js';

import { FormInput } from '@alifd/fusion-ui';

import { Loading, Pagination } from '@alifd/next';

import { NextText } from '@alilc/lowcode-materials/lib/index.js';

import { createFetchHandler as __$$createFetchRequestHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import './index.css';

import '@alifd/pro-layout/lib/index.scss';

import '@alifd/next/lib/loading/style';

import '@alifd/next/lib/pagination/style';

import '@alilc/lowcode-materials/lib/style';

class $$Page extends React.Component {
  _context = this;

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = __$$createDataSourceEngine(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: { fetch: __$$createFetchRequestHandler() },
  });

  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      loading: false,
      accounts: [],
      count: 0,
      searchParams: {
        account: '',
      },
      page: 1,
      pageSize: 10,
      currentOperateIndex: 0,
      editForm: {
        id: null,
        account: '',
        password: '',
      },
    };
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          type: 'fetch',
          isInit: function () {
            return false;
          },
          options: function () {
            return {
              params: {},
              method: 'GET',
              isCors: true,
              timeout: 5000,
              headers: {},
              uri: '/cms/api/account/list',
            };
          },
          id: 'getList',
          dataHandler: function (res) {
            return res.data;
          },
        },
        {
          type: 'fetch',
          isInit: function () {
            return false;
          },
          options: function () {
            return {
              params: {},
              method: 'GET',
              isCors: true,
              timeout: 5000,
              headers: {},
              uri: '/cms/api/account/delete',
            };
          },
          id: 'delItem',
        },
        {
          type: 'fetch',
          isInit: function () {
            return false;
          },
          options: function () {
            return {
              params: {},
              method: 'POST',
              isCors: true,
              timeout: 5000,
              headers: {},
              uri: '/cms/api/account/edit',
            };
          },
          id: 'editItem',
        },
        {
          type: 'fetch',
          isInit: function () {
            return false;
          },
          options: function () {
            return {
              params: {},
              method: 'POST',
              isCors: true,
              timeout: 5000,
              headers: {},
              uri: '/cms/api/account/add',
            };
          },
          id: 'addItem',
        },
      ],
    };
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  getList(page) {
    this.setState({
      loading: true,
      page,
    });
    this.dataSourceMap['getList']
      .load({
        page,
        ...this.state.searchParams,
      })
      .then((res) => {
        res.data.list.forEach((item) => {
          item.f_created_at = moment
            .unix(item.created_at)
            .format('YYYY-MM-DD HH:mm:ss');
        });
        this.setState({
          accounts: res.data.list,
          count: res.data.count,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  search() {
    this.getList(1);
  }

  async operate(e, row, { type }) {
    await this.setState({
      currentOperateIndex: row.rowIndex,
    });
    if (type === 'delete') {
      this.showDeleteModal();
    } else if (type === 'edit') {
      this.showEditModal();
    } else if (type === 'add') {
      this.showAddModal();
    }
  }

  showDeleteModal() {
    this.$('pro-dialog-entrylewu531p').open();
  }

  closeDeleteModal() {
    this.$('pro-dialog-entrylewu531p').close();
  }

  delItem() {
    const { accounts, currentOperateIndex } = this.state;
    const item = accounts[currentOperateIndex];
    this.dataSourceMap['delItem']
      .load({
        id: item.id,
      })
      .then((res) => res.json())
      .then((res) => {
        console.log('del success');
      })
      .catch((err) => console.error(err))
      .finally(() => {
        this.closeDeleteModal();
        this.getList(this.state.page);
      });
  }

  searchParamsChange(value, e, { field }) {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        [field]: value,
      },
    });
  }

  async searchParamsReset() {
    await this.setState({
      searchParams: {
        account: '',
      },
    });
    this.search();
  }

  showEditModal() {
    const { accounts, currentOperateIndex } = this.state;
    const item = accounts[currentOperateIndex];
    this.setState({
      editForm: {
        id: item.id,
        account: item.account,
        password: item.password,
      },
    });
    this.$('pro-dialog-entrylexjoe59').open();
  }

  closeEditModal() {
    this.$('pro-dialog-entrylexjoe59').close();
  }

  onEditConfirm() {
    const item = this.state.editForm;
    this.dataSourceMap['editItem']
      .load({
        id: item.id,
        account: item.account,
        password: item.password,
      })
      .then((res) => res.json())
      .then((res) => {
        console.log('edit success');
        this.closeEditModal();
      });
  }

  onEditFormChange(value) {
    this.setState({
      editForm: {
        ...value,
        id: this.state.editForm.id,
      },
    });
  }

  showAddModal() {
    this.setState({
      addForm: {
        account: '',
        password: '',
      },
    });
    this.$('pro-dialog-entrylexjoe80').open();
  }

  closeAddModal() {
    this.$('pro-dialog-entrylexjoe80').close();
  }

  onAddConfirm() {
    const item = this.state.addForm;
    this.dataSourceMap['addItem']
      .load({
        id: item.id,
        account: item.account,
        password: item.password,
      })
      .then((res) => res.json())
      .then((res) => {
        console.log('add success');
        this.closeAddModal();
      });
  }

  onAddFormChange(value) {
    this.setState({
      addForm: {
        ...value,
      },
    });
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    console.log('did mount');
    this.getList(this.state.page);
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <div
        ref={this._refsManager.linkRef('outerView')}
        style={{ height: '100%' }}
      >
        <ProDialog
          status="success"
          size="small"
          prefix="next-"
          footerAlign="right"
          title="编辑"
          closeMode={['esc', 'close']}
          hasMask={true}
          align="cc cc"
          minMargin={40}
          isAutoContainer={true}
          visible={false}
          iconType="prompt"
          explanation="提示文案"
          operationConfig={{ align: 'right' }}
          operations={[
            { action: 'ok', type: 'primary', content: '确认' },
            { action: 'cancel', type: 'normal', content: '取消' },
          ]}
          ref={this._refsManager.linkRef('pro-dialog-entrylexjoe59')}
          hasTips={false}
          autoFocus={false}
          style={{ position: 'fixed' }}
          __events={{
            eventDataList: [
              {
                type: 'componentEvent',
                name: 'onOk',
                relatedEventName: 'onAddConfirm',
              },
            ],
            eventList: [
              { name: 'onOk', disabled: true },
              { name: 'onCancel', disabled: false },
              { name: 'onClose', disabled: false },
            ],
          }}
          onOk={function () {
            return this.onEditConfirm.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
        >
          <NextP
            wrap={false}
            type="body2"
            verAlign="middle"
            textSpacing={true}
            align="left"
            prefix=""
            full={false}
            flex={false}
          >
            <ProForm
              placeholder="请在右侧面板添加表单项+"
              placeholderStyle={{
                height: '38px',
                color: '#0088FF',
                background: '#d8d8d836',
                border: 0,
                gridArea: 'span 4 / span 4',
              }}
              columns={1}
              labelCol={{ fixedSpan: 4 }}
              labelAlign="left"
              emptyContent="添加表单项"
              ref={this._refsManager.linkRef('pro-form-entrylexjolw7')}
              operations={[]}
              size="medium"
              device="desktop"
              __events={{
                eventDataList: [
                  {
                    type: 'componentEvent',
                    name: 'onChange',
                    relatedEventName: 'onEditFormChange',
                  },
                ],
                eventList: [
                  { name: 'saveField', disabled: false },
                  { name: 'onSubmit', disabled: false },
                  { name: 'onChange', disabled: true },
                ],
              }}
              onChange={function () {
                return this.onEditFormChange.apply(
                  this,
                  Array.prototype.slice.call(arguments).concat([])
                );
              }.bind(this)}
            >
              <FormInput
                formItemProps={{
                  primaryKey: '6782',
                  label: '账号',
                  size: 'medium',
                  device: 'desktop',
                  fullWidth: true,
                  required: true,
                  name: 'account',
                }}
                placeholder="请输入"
                defaultValue={__$$eval(() => this.state.editForm.account)}
              />
              <FormInput
                formItemProps={{
                  primaryKey: '1772',
                  label: '密码',
                  size: 'medium',
                  device: 'desktop',
                  fullWidth: true,
                  required: true,
                  name: 'password',
                }}
                placeholder="请输入"
                defaultValue={__$$eval(() => this.state.editForm.password)}
              />
            </ProForm>
          </NextP>
        </ProDialog>
        <ProDialog
          status="success"
          size="small"
          prefix="next-"
          footerAlign="right"
          title="新增"
          closeMode={['esc', 'close']}
          hasMask={true}
          align="cc cc"
          minMargin={40}
          isAutoContainer={true}
          visible={false}
          iconType="prompt"
          explanation="提示文案"
          operationConfig={{ align: 'right' }}
          operations={[
            { action: 'ok', type: 'primary', content: '确认' },
            { action: 'cancel', type: 'normal', content: '取消' },
          ]}
          ref={this._refsManager.linkRef('pro-dialog-entrylexjoe80')}
          hasTips={false}
          autoFocus={false}
          style={{ position: 'fixed' }}
          __events={{
            eventDataList: [
              {
                type: 'componentEvent',
                name: 'onOk',
                relatedEventName: 'onAddConfirm',
              },
            ],
            eventList: [
              { name: 'onOk', disabled: true },
              { name: 'onCancel', disabled: false },
              { name: 'onClose', disabled: false },
            ],
          }}
          onOk={function () {
            return this.onAddConfirm.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
        >
          <NextP
            wrap={false}
            type="body2"
            verAlign="middle"
            textSpacing={true}
            align="left"
            prefix=""
            full={false}
            flex={false}
          >
            <ProForm
              placeholder="请在右侧面板添加表单项+"
              placeholderStyle={{
                height: '38px',
                color: '#0088FF',
                background: '#d8d8d836',
                border: 0,
                gridArea: 'span 4 / span 4',
              }}
              columns={1}
              labelCol={{ fixedSpan: 4 }}
              labelAlign="left"
              emptyContent="添加表单项"
              ref={this._refsManager.linkRef('pro-form-entrylexjolw7')}
              operations={[]}
              size="medium"
              device="desktop"
              __events={{
                eventDataList: [
                  {
                    type: 'componentEvent',
                    name: 'onChange',
                    relatedEventName: 'onEditFormChange',
                  },
                ],
                eventList: [
                  { name: 'saveField', disabled: false },
                  { name: 'onSubmit', disabled: false },
                  { name: 'onChange', disabled: true },
                ],
              }}
              onChange={function () {
                return this.onAddFormChange.apply(
                  this,
                  Array.prototype.slice.call(arguments).concat([])
                );
              }.bind(this)}
            >
              <FormInput
                formItemProps={{
                  primaryKey: '6782',
                  label: '账号',
                  size: 'medium',
                  device: 'desktop',
                  fullWidth: true,
                  required: true,
                  name: 'account',
                }}
                placeholder="请输入"
                defaultValue={__$$eval(() => this.state.editForm.account)}
              />
              <FormInput
                formItemProps={{
                  primaryKey: '1772',
                  label: '密码',
                  size: 'medium',
                  device: 'desktop',
                  fullWidth: true,
                  required: true,
                  name: 'password',
                }}
                placeholder="请输入"
                defaultValue={__$$eval(() => this.state.editForm.password)}
              />
            </ProForm>
          </NextP>
        </ProDialog>
        <NextPage
          headerDivider={true}
          minHeight="100vh"
          presetNav={true}
          presetAside={true}
          footer={false}
          nav={false}
          aside={false}
          placeholderStyle={{ gridRowEnd: 'span 1', gridColumnEnd: 'span 12' }}
          headerProps={{ background: 'surface' }}
          isTab={false}
          contentAlignCenter={false}
          contentProps={{ style: { background: 'rgba(255,255,255,0)' } }}
          navProps={{ width: 200 }}
          asideProps={{ width: 200 }}
          background="lining"
          ref={this._refsManager.linkRef('nextpage-04429763')}
        >
          <NextBlock
            placeholderStyle={{ height: '100%' }}
            noPadding={false}
            noBorder={false}
            title=""
            rowGap={20}
            colGap={20}
            background="surface"
            layoutmode="O"
            strict={true}
            colSpan={12}
            rowSpan={1}
            mode="transparent"
            childTotalColumns={12}
            ref={this._refsManager.linkRef('nextblock-d61d61e9')}
          >
            <NextBlockCell
              colSpan={12}
              rowSpan={1}
              mode="procard"
              isAutoContainer={true}
              title=""
              hasDivider={true}
              loading={false}
              hasCollapse={false}
              text={true}
              operations={[]}
              isFillContainer={true}
            >
              <NextRowColContainer rowGap={20} colGap={20}>
                <NextRow>
                  <NextCol colSpan={1}>
                    <NextP
                      wrap={false}
                      type="body2"
                      verAlign="middle"
                      textSpacing={true}
                      align="left"
                      prefix=""
                      full={false}
                      flex={false}
                    >
                      <Filter
                        labelAlign="left"
                        status="editable"
                        isPreview={false}
                        cols={4}
                        operations={[]}
                        ref={this._refsManager.linkRef('filter-59d5c033')}
                        labelTextAlign="right"
                        labelCol={{ fixedSpan: 4 }}
                        className=""
                        __events={{
                          eventDataList: [
                            {
                              type: 'componentEvent',
                              name: 'onSearch',
                              relatedEventName: 'search',
                            },
                            {
                              type: 'componentEvent',
                              name: 'onReset',
                              relatedEventName: 'searchParamsReset',
                            },
                          ],
                          eventList: [
                            { name: 'onExpand', disabled: false },
                            { name: 'onSearch', disabled: true },
                            { name: 'onReset', disabled: true },
                          ],
                        }}
                        onSearch={function () {
                          return this.search.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        onReset={function () {
                          return this.searchParamsReset.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                      >
                        <FormInput
                          formItemProps={{
                            primaryKey: 'id-4go81u',
                            label: '账号',
                            size: 'medium',
                            columnSpan: 1,
                            fullWidth: true,
                            required: false,
                            name: 'searchParams.account',
                          }}
                          placeholder="请输入"
                          __events={{
                            eventDataList: [
                              {
                                type: 'componentEvent',
                                name: 'onChange',
                                relatedEventName: 'searchParamsChange',
                                paramStr: '{\n \t "field": "account"\n}',
                              },
                            ],
                            eventList: [
                              { name: 'onPressEnter', disabled: false },
                              { name: 'onClear', disabled: false },
                              { name: 'onChange', disabled: true },
                              { name: 'onKeyDown', disabled: false },
                              { name: 'onFocus', disabled: false },
                              { name: 'onBlur', disabled: false },
                            ],
                          }}
                          onChange={function () {
                            return this.searchParamsChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([
                                {
                                  field: 'account',
                                },
                              ])
                            );
                          }.bind(this)}
                        />
                      </Filter>
                    </NextP>
                  </NextCol>
                </NextRow>
              </NextRowColContainer>
            </NextBlockCell>
          </NextBlock>
          <NextBlock
            placeholderStyle={{ height: '100%' }}
            noPadding={false}
            noBorder={false}
            title=""
            rowGap={20}
            colGap={20}
            background="surface"
            layoutmode="O"
            strict={true}
            colSpan={12}
            rowSpan={1}
            mode="transparent"
            childTotalColumns={12}
            ref={this._refsManager.linkRef('nextblock-1b6d79fa')}
          >
            <NextBlockCell
              colSpan={12}
              rowSpan={1}
              mode="procard"
              isAutoContainer={true}
              title=""
              hasDivider={true}
              loading={false}
              hasCollapse={false}
              text={true}
              operations={[]}
              isFillContainer={true}
              ref={this._refsManager.linkRef('nextblockcell-c3d89ffd')}
            >
              <NextRowColContainer rowGap={20} colGap={20}>
                <NextRow>
                  <NextCol colSpan={1}>
                    <NextP
                      wrap={false}
                      type="body2"
                      verAlign="middle"
                      textSpacing={true}
                      align="left"
                      prefix=""
                      full={false}
                      flex={false}
                      ref={this._refsManager.linkRef('nextp-83ac7771')}
                    >
                      <Loading
                        color="red"
                        prefix="next-"
                        tipAlign="bottom"
                        visible={__$$eval(() => this.state.loading)}
                        size="large"
                        inline={true}
                        _unsafe_MixedSetter_visible_select="ExpressionSetter"
                      >
                        <ProTable
                          dataSource={__$$eval(() => this.state.accounts)}
                          actionColumnButtons={{
                            dataSource: [
                              {
                                children: '编辑',
                                type: 'normal',
                                disabled: false,
                                onClick: function () {
                                  return this.operate.apply(
                                    this,
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([
                                        {
                                          type: 'edit',
                                        },
                                      ])
                                  );
                                }.bind(this),
                              },
                              {
                                children: '删除',
                                type: 'primary',
                                onClick: function () {
                                  return this.operate.apply(
                                    this,
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([
                                        {
                                          type: 'delete',
                                        },
                                      ])
                                  );
                                }.bind(this),
                              },
                            ],
                            text: true,
                            visibleButtonCount: 1,
                          }}
                          actionBarButtons={{
                            dataSource: [
                              {
                                type: 'primary',
                                children: '新增',
                                onClick: function () {
                                  return this.showAddModal.apply(
                                    this,
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([])
                                  );
                                }.bind(this),
                              },
                            ],
                            visibleButtonCount: 3,
                            text: false,
                          }}
                          settingButtons={true}
                          columns={[
                            {
                              title: 'id',
                              formatType: 'text',
                              dataIndex: 'id',
                              _format_options_date: 'YYYY-MM-DD HH:mm:ss',
                            },
                            {
                              title: '账号',
                              dataIndex: 'account',
                              width: 160,
                              formatType: 'text',
                              searchable: false,
                              _format_options_date: 'YYYY-MM-DD HH:mm:ss',
                            },
                            {
                              title: '密码',
                              dataIndex: 'password',
                              formatType: 'text',
                              _format_options_date: 'YYYY-MM-DD HH:mm:ss',
                            },
                            {
                              title: '创建时间',
                              formatType: 'text',
                              dataIndex: 'f_created_at',
                              _format_options_date: 'YYYY-MM-DD HH:mm:ss',
                            },
                          ]}
                          primaryKey="id"
                          actionColumnProps={{ title: '操作' }}
                          indexColumn={false}
                          hasBorder={false}
                          isZebra={true}
                          fixedHeader={false}
                          _unsafe_MixedSetter_dataSource_select="ExpressionSetter"
                          size="medium"
                          ref={this._refsManager.linkRef('protable-3e23c30e')}
                          _unsafe_MixedSetter_paginationProps_select="ObjectSetter"
                          paginationProps={{ hidden: true }}
                        />
                        <Pagination
                          prefix="next-"
                          type="normal"
                          shape="normal"
                          size="medium"
                          defaultCurrent={__$$eval(() => this.state.page)}
                          total={__$$eval(() => this.state.count)}
                          pageShowCount={5}
                          pageSize={__$$eval(() => this.state.pageSize)}
                          pageSizePosition="start"
                          showJump={true}
                          pageSizeSelector={false}
                          hideOnlyOnePage={false}
                          link=""
                          rtl=""
                          _unsafe_MixedSetter_total_select="VariableSetter"
                          __events={{
                            eventDataList: [
                              {
                                type: 'componentEvent',
                                name: 'onChange',
                                relatedEventName: 'getList',
                              },
                            ],
                            eventList: [
                              {
                                name: 'onChange',
                                description:
                                  '页码发生改变时的回调函数\n@param {Number} current 改变后的页码数\n@param {Object} e 点击事件对象',
                                disabled: true,
                              },
                              {
                                name: 'onPageSizeChange',
                                description:
                                  '每页显示记录数量改变时的回调函数\n@param {Number} pageSize 改变后的每页显示记录数',
                                disabled: false,
                              },
                            ],
                          }}
                          onChange={function () {
                            return this.getList.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          style={{ textAlign: 'right', marginTop: '30px' }}
                          ref={this._refsManager.linkRef('pagination-8cd850e6')}
                        />
                      </Loading>
                    </NextP>
                  </NextCol>
                </NextRow>
              </NextRowColContainer>
            </NextBlockCell>
          </NextBlock>
        </NextPage>
        <ProDialog
          status="success"
          size="small"
          prefix="next-"
          footerAlign="right"
          title="删除"
          closeMode={['esc', 'close']}
          hasMask={true}
          align="cc cc"
          minMargin={40}
          isAutoContainer={true}
          visible={false}
          iconType="prompt"
          explanation="提示文案"
          operationConfig={{
            align: 'right',
            fixed: false,
            showSaveTime: false,
          }}
          operations={[
            { action: 'ok', type: 'primary', content: '确认' },
            { action: 'cancel', type: 'normal', content: '取消' },
          ]}
          ref={this._refsManager.linkRef('pro-dialog-entrylewu531p')}
          dialogType="normal"
          hasTips={false}
          autoFocus={false}
          style={{ textAlign: 'left', position: 'fixed' }}
          __events={{
            eventDataList: [
              {
                type: 'componentEvent',
                name: 'onOk',
                relatedEventName: 'delItem',
              },
            ],
            eventList: [
              { name: 'onOk', disabled: true },
              { name: 'onCancel', disabled: false },
              { name: 'onClose', disabled: false },
            ],
          }}
          onOk={function () {
            return this.delItem.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
        >
          <NextP
            wrap={false}
            type="body2"
            verAlign="middle"
            textSpacing={true}
            align="left"
            prefix=""
            full={false}
            flex={false}
            ref={this._refsManager.linkRef('nextp-6975dce0')}
          >
            <NextText
              type="inherit"
              mark={false}
              code={false}
              delete={false}
              underline={false}
              strong={false}
              prefix=""
              classname=""
            >
              是否确认删除？
            </NextText>
          </NextP>
        </ProDialog>
      </div>
    );
  }
}

export default $$Page;

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) {}
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
