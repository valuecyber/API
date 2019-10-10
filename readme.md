# VCT API

## Group HTTP Example

## SUCCESS [/api/v1/success]

### 成功响应示例 [GET]

- result 为业务相关的数据，详见各个接口的定义

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result" : "response object"
            }

## ERROR [/api/v1/error]

### 失败响应示例 [GET]

- error
    - code: 错误码
    - message: 错误信息
    - data: 额外的错误相关数据

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "error" : {
                    "code" : -100,
                    "message" : "error message",
                    "data" : "data object"
                }
            }

# Group Account

## 账号管理 [/api/v1/account/{accountID}/{index}]

### 创建账号 [POST]

- 请求参数说明

    - accountID: 新创建账号的账号 ID
        - 账号 ID 在本地需要保证唯一性
        - 账号 ID 仅用于方便本地操作，该信息并未在机器间同步
    - \[index\]: 使用已经创建的账号创建子账号
        - 账号 ID 之前必须已经创建
        - 创建的子账号将会被记录在本地，并以 accountID : index 的形式显示 

- 响应参数说明

    - result: 成功创建的账号地址

+ Request (application/x-www-form-urlencoded;charset=utf-8)

    + Body

            accountID=account01

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": "ATVmjywxE9maiZY92vySKfupRiu3tg0G-Q"
            }

### 查询账号地址 [GET]

- 响应参数说明

    - result: 账号 ID 对应的账号地址

+ Parameters

    + accountID: `account01` (string, required) - 账号 ID

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": "ATVmjywxE9maiZY92vySKfupRiu3tg0G-Q"
            }

### 修改账号别名 [PATCH]

- 请求参数说明

    - newAccountID: 新账号 ID

- 响应参数说明

    - result: 账号地址

+ Parameters

    + accountID: `account01` (string, required) - 原账号 ID

+ Request (application/x-www-form-urlencoded;charset=utf-8)

    + Body

            newAccountID=account02

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": "ATVmjywxE9maiZY92vySKfupRiu3tg0G-Q"
            }

### 删除账号 [DELETE]

- 响应参数说明

    - result: 成功删除的账号地址

+ Parameters

    + accountID: `account01` (string, required) - 账号 ID

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": "ATVmjywxE9maiZY92vySKfupRiu3tg0G-Q"
            }

### 列出本地所有账号 [GET]

- GET 响应参数说明

    - result: 所有账号信息
        - key 为账号 ID
        - value 为账号地址

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": {
                    "account01" : "ATVmjywxE9maiZY92vySKfupRiu3tg0G-Q",
                    "account02" : "AWVQUuLC66BMT71kJeY11wDnDdbtltZNUA",
                    "account03" : "AfN2Wq9ISsClm8wuqmgxt92oHra72YzvHA"
                }
            }

### 获取子账号地址 [GET]

- 响应参数说明

    - result: 子账号地址
    - error
        - code 为 -100 时，表示该索引值的子账号无效，需更换索引值重新获取

+ Parameters

    + accountID: `account01` (string, required) - 账号 ID
    + index: `100` (number, required) - 子账号索引，从 1 开始计数

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": "AWVQUuLC66BMT71kJeY11wDnDdbtltZNUA"
            }

## 密钥管理 [/api/v1/privkey/{accountID}]

### 导入密钥 [POST]

- 请求参数说明

    - accountID: 导入密钥后创建的账号 ID
    - privkey: 密钥

- 响应参数说明

    - result: 成功导入的账号地址

+ Request (application/x-www-form-urlencoded;charset=utf-8)

    + Body

            accountID=account01&privkey=tKo3QrjyPfzTHJkbQ_ALANnLVxavKt77h3GICqZ2q38=

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": "ATVmjywxE9maiZY92vySKfupRiu3tg0G-Q"
            }

### 导出密钥 [GET]

- 响应参数说明

    - result: 账号密钥

+ Parameters

    + accountID: `account01` (string, required) - 账号 ID

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": "MCUCAQECIDtF+PyxKKkGz5sMRUYMZ4kYtTk+W5EwOfoGyo3ZJIaP"
            }



# Group Fund

## 转账相关 [/api/v1/fund/{fundID}]

### 转账 [POST]

- 请求参数说明

    - accountID : 支付人的账号ID
        - 账号地址必须是已经记录在本地的地址，可以是根账号或者子账号
    - \[index\]: 使用 accountID 的子账号
    - from: 支付人地址，如果指定账号，此参数被忽略
    - to: 受付人地址
    - amount: 转账金额
    - nonce: (可选)此次转账的唯一标识，相同 nonce 值的事务在一定时间（1小时）内不会被重复收入区块

- 响应参数说明

    - result: 转账事务 ID (fundID)

+ Request (application/x-www-form-urlencoded;charset=utf-8)

    + Body

            accountID=account01&index=0&to=AfN2Wq9ISsClm8wuqmgxt92oHra72YzvHA&amount=100000&nonce=fdsaf12313

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "status": "0",
                "result": "ec239f5e06ff497a96e2d3ee9d266867"
            }

### 查询转账结果 [GET]

- 说明
    - fund 事务未上链时，通过本接口查询到的 result 的所有属性为空

- 响应参数说明

    - result: 转账事务详细信息
        - from: 转账信息
        - to: 接收信息
        - amount：转账金额
        - \[external\]: 表示转账由外部chaincode执行
        - time: 事务上链时间

+ Parameters

    + fundID: `ec239f5e06ff497a96e2d3ee9d266867` (string, required) - 转账事务 ID，POST 请求的响应中提取

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc": "2.0",
                "result": {
                     "txID": "fafdafasfdafdafdafda",
                     "amount": "1000",
                     "from": {
                         "noncekey": "pIDnnUKv74c6Tanv5mehzYveAWHQV2Rq5ENoecKC68U=",
                         "isSend": false
                     },
                     "to": {
                         "noncekey": "pIDnnUKv74c6Tanv5mehzYveAWHQV2Rq5ENoecKC68U=",
                         "isSend": true
                     },
                     "txTime": "2019-07-16 02:07:58"
                }
            }


# 多Token支持

上述方法可以在Group名前添加token路径\[token.<Token Name>\]，此时方法将操作token Name对应的token，参数和输出格式不变，例如对名为VCTX的token执行转账，方法URL为：

- **\[POST\] /api/v1/token.VCTX/fund**

*Token名只能由字母和数字构成，长度为4-16字节之间*


# Group RawTransaction 

## 生成一个待签名的事务 [/api/v1/data]

- 说明

     此路径下可以连接上述业务API中的任何路径，结果将产生一个对应的待签名事务内容和需签名的hash值，调用者可以使用自己的私钥签名此hash并提交已签名的事务，例如 \[POST\] /api/v1/data/fund 将生成一个待签名的转账事务

- 响应参数说明

    - raw: 生成的待签名事务
    - hash: 此事务需要签名的hash值，以十六进制数表示
    - promise: 此事务如果是调用（invoke），提供和实际调用时相同的返回值；如果是查询（query），仅显示返回值中包含的数据内容，而不包含实际的值

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": {
                    "raw":"I::TOKEN.TRANSFER:ChoKB0FCQ0hBSU4SD0F0b21pY0VuZXJneV92MRIGCPPk8OEFGhRrumYaeGyTASFlvIj4UyA1NTgckw==:CgsIRZUWFAFISgAAABIWChT9hccdqdkYsNsFR5nG+3qAMCdWnhoWChQSbaukOOqE58Q8L1ajIA7WXjcbOw==",
                    "hash":"03BD91127B5FED4EC9C0F71A516944880558E5EFC71520A38607189EC302251E",
                    "promise": {
                        "txID": "pending",
                        "fundNonce": "H-5R9kjK42HSFuA1_h4CqY_8IfBdEAU2aE1FWE79gVA=",
                        "Nonce": "a7pmGnhskwEhZbyI+FMgNTU4HJM="
                    }
                }
            }

## 转换公钥到地址 [POST /api/v1/account/frompublickey]

- 请求参数说明

    - pubkeybuffer: 需要转换为地址的公钥内容，以16进制数表示，格式可以参考 application/util/signhelper 中的node.js示例

- 响应参数说明

    - result: 公钥对应的地址

+ Request (application/x-www-form-urlencoded;charset=utf-8)

    + Body

            pubkeybuffer=EC:01,d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645cd85228a6fb29940e858e7e55842ae2bd115d1ed7cc0e82d934e929c97648cb0a

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc": "2.0",
                "result": "ARJtq6Q46oTnxDwvVqMgDtZeNxs7Ybt81A"
            }


## 提交事务 [POST /api/v1/rawtransaction]]

- 请求参数说明

    - tx: 提交的事务内容，编码方案和生成待签名事务时相同
    - \[sig\]: 编码为字符串的签名值，生成的格式：`EC:01,publicKey,rs:` rs 为椭圆曲线签名的r s值
        - 一次请求可携带0 ~ 多个 sig 参数
    - \[accountID | account\]: 账号 ID 或账号地址，系统会使用此账号向事务中追加一个签名
        - 账号地址必须是已经记录在本地的地址，可以是根账号或者子账号
    - \[index\]: 使用 accountID 的子账号        

- 响应参数说明

    - result: 提交的事务 ID
        - 当前API不支持提交query类型的事务

+ Request (application/x-www-form-urlencoded;charset=utf-8)

    + Body

            tx=I::TOKEN.TRANSFER:ChoKB0FCQ0hBSU4SD0F0b21pY0VuZXJneV92MRIGCKKw8OEFGhRiXies8Zp97ktRv1lyR4mZtZV8Vw==:CgoVLQLH4Ur2gAAAEhYKFJT1uordAf/qOrTeOPjfYkl4eSUUGhYKFBJtq6Q46oTnxDwvVqMgDtZeNxs7&sig=EC:01,d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645cd85228a6fb29940e858e7e55842ae2bd115d1ed7cc0e82d934e929c97648cb0a,5f27d831cfe37e7542a1a5d9c687d935f0fd10dc60c2605be7a07ae26b77e22e23ebcbeed6ca7a1c9873009bc060ece0930d3013221efc87e9a4b1b1bb654b6c:

## 执行签名 [POST /api/v1/signature]]

- 请求参数说明

    - hash: 需要签名的hash，用16进制表示
    - accountID | account: 账号 ID 或账号地址
        - 账号地址必须是已经记录在本地的地址，可以是根账号或者子账号
    - \[index\]: 使用 accountID 的子账号

- 响应参数说明

    - result: 生成的签名数据，编码为可在事务提交中使用的格式

+ Request (application/x-www-form-urlencoded;charset=utf-8)

    + Body

        hash=A0C248E68881CA5D00B4CCCD0CDD3CEF0747674CC13F6559825C9393FF8089ED
        &accountID=aaa

+ Response 200 (application/json;charset=utf-8)

    + Body

        {
            "jsonrpc": "2.0",
            "result": "EC:01,D7B150F1A79153F8CF8755E42154B58F194D9A6A0E7805A1BBAA528107DA25AC18466D511E2706D8B4E1D00B3C0533D6637ED3D050547B01FD24D3C9E9F6D673,EBAD9654E5A5BA6D56EBEC4DC2B15444AE6ACF49CF2BD4844E09EF269EEA65E34A6D0600C92BAC7FE97465F37B5A88E2E233ADBE54BD547CF01872DB3DE454A9:"
        }

# Group Blockchain

## 获取区块链基础信息 [/api/v1/chain]

### 获取区块链基础信息 [GET]

- 响应参数说明

    - result

        - height: 当前区块高度

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc" : "2.0",
                "result": {
                    "height": 4,
                }
            }

## 获取指定高度区块信息 [/api/v1/chain/blocks/{height}]

### 获取指定高度区块信息 [GET]

- 响应参数说明

    - result： 区块详细信息

        - PreviousHash: 前一个 block 的hash 值
        - transactions: 本区块内收录的所有事务信息
            - 事务的具体字段描述，参见“查询事务信息”接口的说明
        - events: 本区块内事务所触发的事件通知信息

- transactions 说明
    - Method ：x.y ,x:TOKEN 为VCT  MTOKEN为token 操作
               y ：INIT：初始化 ；TRANSFER 转账； ASSIGN 后台分配


- events 说明
   -  Status: 1, 错误事务


+ Parameters
  
+ height: `6` (string, required) - 区块高度
  
+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc": "2.0",
                "result": {
                    "Height": "6",
                    "Hash": "B1EFE20FA6E3EDEB2561D26959A0C070473F7829728DC3C46AE06D3CE3667920...",
                    "PreviousHash": "A0F969847DF93E00D010C92D48D6FA5983E762E4C6D51E87D05A15F505957896",
                    "TimeStamp": "2019-07-01 12:00:00 +0000 UTC",
                    "transactions": [
                        {
                            "Height": "6",
                            "TxID": "dc1db3e8697e8e389f2fc67f45540174090cbf315663664d4990c77b1eff4623",
                            "Chaincode": "aecc",
                            "Method": "TOKEN.TRANSFER",
                            "CreatedFlag": false,
                            "ChaincodeModule": "AtomicEnergy_v1",
                            "Nonce": "132034CE841966E3F58B5C46038B368C20D9650F",
                            "Detail": {
                                "amount": "11",
                                "from": "ARJtq6Q46oTnxDwvVqMgDtZZNxs7Ybt81A",
                                "to": "AfmAE1K-T8Vyy4ObshuwV2faNMOdNMYW0Q"
                            },
                            "TxHash": "A9282AB2DA23636289214431927C164EE28862B94C49B837C3AC2933144741BC"
                        },
                        {
                            "Height": "6",
                            "TxID": "dba352513f49fff20d514c6d70c99d459f0460b90cbf3c7f1772312bae03f81f",
                            "Chaincode": "aecc",
                            "Method": "TOKEN.TRANSFER",
                            "CreatedFlag": false,
                            "ChaincodeModule": "AtomicEnergy_v1",
                            "Nonce": "CB7D2F3B46A0ABF9647470D0158727EB3F13017F",
                            "Detail": {
                                "amount": "1000000000000000000000000000",
                                "from": "ARJtq6Q46oTnxDwvVqMgDtZZNxs7Ybt81A",
                                "to": "AfmAE1K-T8Vyy4ObshuwV2faNMOdNMYW0Q"
                            },
                            "TxHash": "73DC4E179489CA6A85DE1AC3BB0DF443EC51E23F583CC8C486B112272DAF1084"
                        }
                    ],
                    "events": [
                        {
                            "TxID": "dba352513f49fff20d514c6d70c99d459f0460b90cbf3c7f1772312bae03f81f",
                            "Chaincode": "",
                            "Name": "INVOKEERROR",
                            "Status": 1,
                            "Detail": "<Parser>  Transaction or query returned with failure:  not enough amount"
                        }
                    ]
                }
            }


## 解析一个事务 [/api/v1/chain/parseTx]

### 解析事务 [POST]

- 请求参数说明
    - tx: 提交的事务内容，通常是生成的待签名事务

- 响应参数说明

    - result: 被解析的事务信息，具有和查询链上事务信息类似的数据结构，其中TxID将被显示为Unknown

+ Request (application/x-www-form-urlencoded;charset=utf-8)

    + Body

        tx=I::MTOKEN.TRANSFER:ChoKB0FCQ0hBSU4SD0F0b21pY0VuZXJneV92MRIGCITtq+IFGhS4tudQ90DdEcgcAt/AFKKXgs6QoQ==:CgRFT1NBGj0KC6VvpbmQGaXIAAAAEhYKFBJtq6Q46oTnxDwvVqMgDtZeNxs7GhYKFC6mOHOU3PKLpmHXinFgxK+3GhDb

+ Response 200 (application/json;charset=utf-8)

    + Body

            {
                "jsonrpc": "2.0",
                "result": {
                    "Height": "0",
                    "TxID": "Unknown",
                    "Chaincode": "Unknown",
                    "Method": "MTOKEN.TRANSFER",
                    "CreatedFlag": false,
                    "ChaincodeModule": "AtomicEnergy_v1",
                    "Nonce":     "B8B6E750F740DD11C81C02DFC014A29782CE90A1",
                    "Detail": {
                        "amount": "200000000000000000000000000",
                        "from":     "AS6mOHOU3PKLpmHXinFgxK-3GhDb9YuC2g",
                        "to":     "ARJtq6Q46oTnxDwvVqMgDtZeNxs7Ybt81A",
                        "token": "EOSA"
                    },
                    "TxHash":     "B3C9C3C99BC7DFF9466DDD4D494EC120AECAEF0EF67    98583C5667D77DD7324DD"
                }
            }
    

## 查询地址信息 [/api/v1/address/{address}]

### 查询地址信息 [GET]

- 响应参数说明

    - result: 
        - balance: 地址余额        
        - lastFundID: 最近的一次 fund ID

+ Parameters
    + address: `AWVQUuLC66BMT71kJeY11wDnDdbtltZNUA` (string, required) - 查询地址

+ Response 200 (application/json;charset=utf-8)

    + Body


            {
                "jsonrpc": "2.0",
                "result": {
                    "balance": 9000,
                    "lastFundID": "c52cad8b-6aa3-4001-88df-7da9e22e4526"
                }
            }

