# ptz100_agx

PTZ 相关工程：公共组件、物联网设备 SDK、ROS 等。

---

## 一、公共模块（public）

### 模块说明

```
.
├── appLog                   # 日志模块
├── config                   # 公共配置文件或数据库表接口
├── gstNvDeeps               # 视频编解码、RTSP 推流等
├── modbusEncode             # modbus 协议编码
├── mqtt                     # mqtt 客户端服务
├── shmTransferFrame         # 共享内存传图
├── socketTcpClient          # TCP 客户端
├── socketUdpService         # UDP 服务
├── uartService              # 串口服务
└── utils                    # 实用函数接口
```

### 公共配置（config）

- **configUtils**：通用函数接口  
- **sqliteConfig**：sqlite 配置  
- **yamlConfig**：yaml 配置  
- **jsonConfig**：json 配置  
- **iniConfig**：ini 配置  

---

## 二、物联网设备（iotDevices）

对接物联网设备，封装设备 SDK，提供多产品复用；与 APP 应用层解耦。

| 模块 | 说明 |
|------|------|
| laserHeSDK | 霍克眼 3 款激光设备：HE-F100、HE-P10、HE-P21 |
| memsBr100aSDK | MEMS 惯性卫星组合导航 BR100A |
| tempSensorPT100SDK | 温度传感器 PT100 |
| ptzHepuSDK | 和普 PTZ 设备 |

---

## 三、ROS 工作空间（ros_ws）

- **ptz100_ai**：AI 相关  
- **ptz100_fusion**：融合  
- **ptz100_guide_ai**：引导 AI  
- **dhp100**：雷达  
- **sfl200**、**br100a**、**laser_service**、**ptz_service**、**ptz_self_test**、**self_calibration**、**srp100_message** 等子模块。

---

## 四、代码仓

- GitHub: [aoxiang706/skyfend_work_hub](https://github.com/aoxiang706/skyfend_work_hub)  
- 本地路径：`workspace/ptz100_agx`
