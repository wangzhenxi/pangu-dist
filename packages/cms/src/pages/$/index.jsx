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
} from '@alifd/pro-layout/lib/index.js';

import { NextText } from '@alilc/lowcode-materials/lib/index.js';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import './index.css';

import '@alifd/pro-layout/lib/index.scss';

import '@alilc/lowcode-materials/lib/style';

class $$Page extends React.Component {
  _context = this;

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
          header=""
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
                      <NextText
                        type="h5"
                        mark={false}
                        code={false}
                        delete={false}
                        underline={false}
                        strong={false}
                        prefix=""
                        classname=""
                      >
                        {__$$eval(
                          () =>
                            this.getHelloWorldText() + this.getHelloWorldText2()
                        )}
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
