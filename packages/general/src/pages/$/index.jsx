// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page as NextPage,
  Block as NextBlock,
  BlockCell as NextBlockCell,
  RowColContainer as NextRowColContainer,
  Row as NextRow,
  Col as NextCol,
  P as NextP,
  PageHeader as NextPageHeader,
} from '@alifd/pro-layout/lib/index.js';

import { NextText } from '@alilc/lowcode-materials/lib/index.js';

import { createFetchHandler as __$$createFetchRequestHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import './index.css';

import '@alifd/pro-layout/lib/index.scss';

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

    this.state = { text: 'outer', isShowDialog: false };
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
            return true;
          },
          options: function () {
            return {
              params: {},
              method: 'GET',
              isCors: true,
              timeout: 5000,
              headers: {},
              uri: 'mock/info.json',
            };
          },
          id: 'info',
          shouldFetch: function () {
            console.log('should fetch.....');
            return true;
          },
        },
      ],
    };
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  testFunc() {
    console.log('test func');
  }

  onClick() {
    this.setState({
      isShowDialog: true,
    });
  }

  closeDialog() {
    this.setState({
      isShowDialog: false,
    });
  }

  getHelloWorldText() {
    return this.i18n('i18n-jwg27yo4');
  }

  getHelloWorldText2() {
    return this.i18n('i18n-jwg27yo3', {
      name: '絮黎',
    });
  }

  onTestConstantsButtonClicked() {
    console.log('constants.ConstantA:', this.constants.ConstantA);
    console.log('constants.ConstantB:', this.constants.ConstantB);
  }

  onTestUtilsButtonClicked() {
    this.utils.demoUtil('param1', 'param2');
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <div
        ref={this._refsManager.linkRef('outerView')}
        style={{ height: '100%' }}
      >
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
          header={
            <NextPageHeader
              style={{ background: '#ffffff', padding: '' }}
              ref={this._refsManager.linkRef('nextpageheader-9a055598')}
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
                      ref={this._refsManager.linkRef('nextp-c48185b9')}
                    >
                      <NextText
                        type="h1"
                        mark={false}
                        code={false}
                        delete={false}
                        underline={false}
                        strong={false}
                        prefix=""
                        classname=""
                      >
                        标题
                      </NextText>
                    </NextP>
                  </NextCol>
                </NextRow>
              </NextRowColContainer>
            </NextPageHeader>
          }
          isTab={false}
          contentAlignCenter={false}
          contentProps={{ style: { background: 'rgba(255,255,255,0)' } }}
          navProps={{ width: 200 }}
          asideProps={{ width: 200 }}
          background="lining"
          ref={this._refsManager.linkRef('nextpage-3225e27a')}
        >
          <NextBlock
            placeholderStyle={{ height: '100%' }}
            noPadding={false}
            noBorder={false}
            title="区域标题"
            rowGap={20}
            colGap={20}
            background="surface"
            layoutmode="O"
            strict={true}
            colSpan={12}
            rowSpan={1}
            mode="transparent"
            childTotalColumns={12}
            ref={this._refsManager.linkRef('nextblock-7b032620')}
          >
            <NextBlockCell
              colSpan={12}
              rowSpan={1}
              mode="procard"
              isAutoContainer={true}
              title="多语言示例"
              hasDivider={true}
              loading={false}
              bodyPadding=""
              hasCollapse={false}
              text={true}
              visibleButtonCount={3}
              isFillContainer={true}
              operationConfig={{ align: 'center' }}
              operations={[]}
              ref={this._refsManager.linkRef('nextblockcell-c210269c')}
            >
              <NextRowColContainer
                rowGap={20}
                colGap={20}
                ref={this._refsManager.linkRef('nextrowcolcontainer-626dc975')}
              >
                <NextRow>
                  <NextCol colSpan={1} justifyContent="flex-start">
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
                      <NextText
                        type="h5"
                        prefix=""
                        classname=""
                        mark={false}
                        code={false}
                        delete={false}
                        underline={false}
                        strong={false}
                      >
                        {__$$eval(() => this.getHelloWorldText())}
                      </NextText>
                      <NextText
                        type="h5"
                        prefix=""
                        classname=""
                        mark={false}
                        code={false}
                        delete={false}
                        underline={false}
                        strong={false}
                      >
                        {__$$eval(() => this.getHelloWorldText2())}
                      </NextText>
                    </NextP>
                  </NextCol>
                </NextRow>
              </NextRowColContainer>
            </NextBlockCell>
          </NextBlock>
        </NextPage>
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
