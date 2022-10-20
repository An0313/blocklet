import { CssBaseline, StyledEngineProvider, Pagination, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './coding-test.module.scss';

const setHash = (hash) => `${hash.slice(0, 4)}-${hash.slice(-4)}`;
const setMrklRoot = (hash) => `${hash.slice(0, 2)}-${hash.slice(-2)}`;
const format = (num) => `${num}`.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
const addNum = (arr, type) => {
  return arr.reduce((p, c) => {
    let a = 0;
    if (Number(p) > 0) a = p;

    return a + c[type].length;
  });
};
// const setTimer = (timer) => (new Date(timer + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '/'))
const setFeeK = (fee) => {
  if (fee < 1000) return fee;
  return `${parseInt(fee / 1000, 10)}k`;
};
const setFee = (fee) => {
  let a = `${fee}`;
  if (a.length <= 8) {
    const ai = 8 - a.length;

    for (let i = 0; i < ai; i++) {
      a = `0${a}`;
    }

    a = `0.${a}`;
  } else {
    a = `${a.slice(0, a.length - 8)}.${a.slice(-8)}`;
  }

  return a;
};
const setAddr = (addr) => `${addr.slice(0, 9)}-${addr.slice(-9)}`;

function BlockInfo({ info }) {
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    history(`/?blockHash=${e.target[0].value}`);
  };
  return (
    <div className={style.blockInfo}>
      <div className={style.searchWapper}>
        <form className={style.search} action="" onSubmit={handleSubmit}>
          <input className={style.input} type="text" placeholder="Block Hash" name="search" />
        </form>
      </div>
      {info.hash ? (
        <div className={style.info}>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Hash:</div>
            <div className={style.infoVal}>{setHash(info.hash)}</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Depth:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Capacity:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Distance:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>BTC:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Value:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Value Today:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Average Value:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Median Value:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Input Value:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Output Value:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Transactions:</div>
            <div className={style.infoVal}>{info.n_tx}</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Witness Tx’s:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Inputs:</div>
            <div className={style.infoVal}>{format(addNum(info.tx, 'inputs'))}</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Outputs:</div>
            <div className={style.infoVal}>{format(addNum(info.tx, 'out'))}</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Fees:</div>
            <div className={style.infoVal}>{setFee(info.fee)} BTC</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Fees Kb:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Fees kWU:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Fee Range:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Average Fee:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Median Fee:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Size:</div>
            <div className={style.infoVal}>{format(info.size)}</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Version:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Merkle Root:</div>
            <div className={style.infoVal}>{setMrklRoot(info.mrkl_root)}</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Difficulty:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Nonce:</div>
            <div className={style.infoVal}>{format(info.nonce)}</div>
          </div>

          <div className={style.infoItem}>
            <div className={style.infoKey}>Bits:</div>
            <div className={style.infoVal}>{format(info.bits)}</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Weight:</div>
            <div className={style.infoVal}>{format(info.weight)} WU</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Median Time:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Minted:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Reward:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Mined on:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Height:</div>
            <div className={style.infoVal}>{format(info.height)}</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Confirmations:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Miner:</div>
            <div className={style.infoVal}>-</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoKey}>Coinbase:</div>
            <div className={style.infoVal}>-</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

BlockInfo.defaultProps = {
  info: {},
};
BlockInfo.propTypes = {
  info: PropTypes.object,
};

function Transaction({ list }) {
  const [path, setPath] = useState(1);
  const pathSize = 20;
  const randerList = useMemo(() => list.slice((path - 1) * pathSize, pathSize * path), [path, list]);
  const PCount = useMemo(() => Math.ceil(list.length / pathSize), [list]);

  const handleChangePage = (e, v) => {
    setPath(v);
  };

  return (
    <div className={style.transaction}>
      <div className={style.transactionList}>
        {randerList.map((item) => (
          <div className={style.transactionItem} key={item.hash}>
            <div className={style.transactionItemTop}>
              <div className={style.left}>
                <span className={style.transactionItemBlack}>TX -</span>
                <span className={style.transactionItemGrey}> • Hash </span>
                <span className={style.transactionItemOrange}>{setHash(item.hash)}</span>
              </div>
              <div className={style.right}>
                <span className={style.transactionItemBlack}>0 BTC</span>
                <span className={style.transactionItemGrey}> $0</span>
              </div>
              <div className={style.left}>
                <span className={style.transactionItemGrey}>-</span>
              </div>
              <div className={style.right}>
                <span className={style.transactionItemRed}>Fee</span>
                <span className={style.transactionItemBlack}> {setFeeK(item.fee)} Sats </span>
                <span className={style.transactionItemGrey}>$0</span>
              </div>
            </div>
            <div className={style.transactionItemBottom}>
              <div className={style.left}>
                <div className={style.title}>From</div>
                {item.inputs.map((inputItem, inputIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={style.bottomItem} key={inputIndex}>
                    {inputItem.prev_out.addr ? (
                      <div className={style.transactionItemOrange}>{setAddr(inputItem.prev_out.addr)}</div>
                    ) : null}
                    <div className={style.transactionItemBlack}>{setFee(inputItem.prev_out.value)} BTC</div>
                    <div className={style.transactionItemOrange}>Scripts</div>
                  </div>
                ))}
              </div>
              <div className={style.right}>
                <div className={style.title}>To</div>
                {item.out.map((outItem, outIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={style.bottomItem} key={outIndex}>
                    {outItem.addr ? <div className={style.transactionItemOrange}>{setAddr(outItem.addr)}</div> : null}
                    <div className={style.transactionItemBlack}>{setFee(outItem.value)} BTC</div>
                    <div className={style.transactionItemOrange}>Scripts</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {list.length > 0 ? (
        <div className={style.pagination}>
          <Pagination count={PCount} onChange={handleChangePage} />
        </div>
      ) : null}
    </div>
  );
}

Transaction.defaultProps = {
  list: [],
};
Transaction.propTypes = {
  list: PropTypes.array,
};

function Home() {
  const [blockInfo, setBlockInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const handleSearch = async (hash) => {
    setLoading(true);
    const res = await axios({
      url: `https://blockchain.info/rawblock/${hash}`,
      timeout: 50000,
    }).catch((err) => {
      return err;
    });
    setLoading(false);

    if (res.status === 200) setBlockInfo(res.data);
    // eslint-disable-next-line no-alert
    else alert(res.message || '请求失败');
  };

  useEffect(() => {
    const blockHash =
      searchParams.get('blockHash') || '00000000000000000007da995eb39d20b9a96bad789d92744807d190f76d922d';
    if (blockHash) handleSearch(blockHash);
  }, [searchParams]);

  return (
    <StyledEngineProvider>
      <CssBaseline>
        <div className={style.home}>
          <div className={style.body}>
            <div className={style.header}>
              <div>安恒光</div>
              <div>
                <a href="tel:15620184082">15620184082</a>
              </div>
            </div>
            <div className={style.mian}>
              <div className={style.content}>
                <BlockInfo info={blockInfo} onSearch={handleSearch} />
                <Transaction list={blockInfo.tx || []} />
              </div>
            </div>
          </div>
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </CssBaseline>
    </StyledEngineProvider>
  );
}

export default Home;
