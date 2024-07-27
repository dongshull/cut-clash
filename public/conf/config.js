window.config = {
  // 网站标题
  siteName: 'Subweb-new',
  // API 地址
  apiUrl: [
    {
      value: 'https://v.id9.cc',
      text: 'v.id9.cc(由品云提供，支持 Vless)',
    },
    {
      value: 'https://api.tsutsu.one/',
      text: 'TAG-机场官方订阅转换(六核负载均衡-支持IPv4/IPv6)',
    },
    {
      value: 'http://127.0.0.1:25500',
      text: '本地局域网版后端',
    },
  ],
  // 短域名服务地址
  shortUrl: 'https://s.ops.ci',
  // 远程配置地址,可以自行按照格式添加。
  remoteConfigOptions: [
    {
      value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini',
      text: 'ACL4SSR Online',
    },
    {
      value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini',
      text: 'ACL4SSR Online Full',
    },    
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini",
      text: "默认"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_AdblockPlus.ini",
      text: "默认（自动测速）"
    },
    {
      value: "https://raw.githubusercontent.com/youshandefeiyang/webcdn/main/SONY.ini",
      text: "默认（索尼电视专用）"
    },
    {
      value: "https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/default_with_clash_adg.yml",
      text: "默认（附带用于 Clash 的 AdGuard DNS）"
    },
    {
      value: "https://raw.githubusercontent.com/WC-Dream/ACL4SSR/WD/Clash/config/ACL4SSR_Online_Full_Dream.ini",
      text: "ACL_全分组 Dream修改版"
    },
    {
      value: "https://raw.githubusercontent.com/WC-Dream/ACL4SSR/WD/Clash/config/ACL4SSR_Mini_Dream.ini",
      text: "ACL_精简分组 Dream修改版"
    },
    {
      value: "https://raw.githubusercontent.com/justdoiting/ClashRule/main/GeneralClashRule.ini",
      text: "emby-TikTok-流媒体分组-去广告加强版"
    },
    {
      value: "https://raw.githubusercontent.com/cutethotw/ClashRule/main/GeneralClashRule.ini",
      text: "流媒体通用分组"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini",
      text: "ACL_默认版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoAuto.ini",
      text: "ACL_无测速版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_AdblockPlus.ini",
      text: "ACL_去广告版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_MultiCountry.ini",
      text: "ACL_多国家版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoReject.ini",
      text: "ACL_无Reject版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_NoAuto.ini",
      text: "ACL_无测速精简版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini",
      text: "ACL_全分组版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Google.ini",
      text: "ACL_全分组谷歌版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_MultiMode.ini",
      text: "ACL_全分组多模式版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Netflix.ini",
      text: "ACL_全分组奈飞版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini",
      text: "ACL_精简版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini",
      text: "ACL_去广告精简版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_Fallback.ini",
      text: "ACL_Fallback精简版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiCountry.ini",
      text: "ACL_多国家精简版"
    },
    {
      value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiMode.ini",
      text: "ACL_多模式精简版"
    },
    {
      value: "https://raw.githubusercontent.com/flyhigherpi/merlinclash_clash_related/master/Rule_config/ZHANG.ini",
      text: "常规规则"
    },
    {
      value: "https://raw.githubusercontent.com/shidahuilang/luci-app-openclash/clash-ZHANG/Rule_config/ZHANG.ini",
      text: "自用"
    },
    {
      value: "https://subweb.s3.fr-par.scw.cloud/RemoteConfig/special/phaors.ini",
      text: "PharosPro无测速"
    },
    {
      value: "https://raw.githubusercontent.com/flyhigherpi/merlinclash_clash_related/master/Rule_config/ZHANG_Area_Fallback.ini",
      text: "分区域故障转移"
    },
    {
      value: "https://raw.githubusercontent.com/flyhigherpi/merlinclash_clash_related/master/Rule_config/ZHANG_Area_Urltest.ini",
      text: "分区域自动测速"
    },
    {
      value: "https://raw.githubusercontent.com/flyhigherpi/merlinclash_clash_related/master/Rule_config/ZHANG_Area_NoAuto.ini",
      text: "分区域无自动测速"
    },
    {
      value: "https://raw.githubusercontent.com/OoHHHHHHH/ini/master/config.ini",
      text: "OoHHHHHHH"
    },
    {
      value: "https://raw.githubusercontent.com/OoHHHHHHH/ini/master/cfw-tap.ini",
      text: "CFW-TAP"
    },
    {
      value: "https://raw.githubusercontent.com/lhl77/sub-ini/main/tsutsu-full.ini",
      text: "lhl77全分组（定期更新）"
    },
    {
      value: "https://raw.githubusercontent.com/lhl77/sub-ini/main/tsutsu-mini-gfw.ini",
      text: "lhl77简易版（定期更新）"
    },
    {
      value: "https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/connershua_new.ini",
      text: "ConnersHua 神机规则 Outbound"
    },
    {
      value: "https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/connershua_backtocn.ini",
      text: "ConnersHua 神机规则 Inbound 回国专用"
    },
    {
      value: "https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/lhie1_clash.ini",
      text: "lhie1 洞主规则（使用 Clash 分组规则）"
    },
    {
      value: "https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/lhie1_dler.ini",
      text: "lhie1 洞主规则完整版"
    },
    {
      value: "https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/ehpo1_main.ini",
      text: "eHpo1 规则"
    },
    {
      value: "https://raw.nameless13.com/api/public/dl/ROzQqi2S/white.ini",
      text: "多策略组默认白名单模式"
    },
    {
      value: "https://raw.nameless13.com/api/public/dl/ptLeiO3S/mayinggfw.ini",
      text: "多策略组可以有效减少审计触发"
    },
    {
      value: 'https://raw.nameless13.com/api/public/dl/FWSh3dXz/easy3.ini',
      text: '精简策略默认白名单',
    },
    {
      value: 'https://raw.nameless13.com/api/public/dl/L_-vxO7I/youtube.ini',
      text: '多策略增加SMTP策略',
    },
    {
      value: 'https://raw.nameless13.com/api/public/dl/zKF9vFbb/easy.ini',
      text: '无策略入门推荐',
    },
    {
      value: 'https://raw.nameless13.com/api/public/dl/E69bzCaE/easy2.ini',
      text: '无策略入门推荐国家分组',
    },
    {
      value: 'https://raw.nameless13.com/api/public/dl/XHr0miMg/ipip.ini',
      text: '无策略仅IPIP CN + Final',
    },
    {
      value: 'https://raw.nameless13.com/api/public/dl/BBnfb5lD/MAYINGVIP.ini',
      text: '无策略魅影vip分组',
    },
    {
      value: 'https://raw.githubusercontent.com/Mazeorz/airports/master/Clash/Examine.ini',
      text: '品云专属配置（仅香港区域分组）',
    },
    {
      value: 'https://raw.githubusercontent.com/Mazeorz/airports/master/Clash/Examine_Full.ini',
      text: '品云专属配置（全地域分组）',
    },
    {
      value: 'https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/nzw9314_custom.ini',
      text: 'nzw9314 规则',
    },
    {
      value: 'https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/maicoo-l_custom.ini',
      text: 'maicoo-l 规则',
    },
    {
      value: 'https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/dlercloud_lige_platinum.ini',
      text: 'DlerCloud Platinum 李哥定制规则',
    },
    {
      value: 'https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/dlercloud_lige_gold.ini',
      text: 'DlerCloud Gold 李哥定制规则',
    },
    {
      value: 'https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/dlercloud_lige_silver.ini',
      text: 'DlerCloud Silver 李哥定制规则',
    },
    {
      value: 'https://unpkg.com/proxy-script/config/Clash/clash.ini',
      text: 'ProxyStorage自用',
    },
    {
      value: 'https://github.com/UlinoyaPed/ShellClash/raw/master/rules/ShellClash.ini',
      text: 'ShellClash修改版规则 (by UlinoyaPed)',
    },
    {
      value: 'https://gist.github.com/jklolixxs/16964c46bad1821c70fa97109fd6faa2/raw/EXFLUX.ini',
      text: 'EXFLUX',
    },
    {
      value: 'https://gist.github.com/jklolixxs/32d4e9a1a5d18a92beccf3be434f7966/raw/NaNoport.ini',
      text: 'NaNoport',
    },
    {
      value: 'https://gist.github.com/jklolixxs/dfbe0cf71ffc547557395c772836d9a8/raw/CordCloud.ini',
      text: 'CordCloud',
    },
    {
      value: 'https://gist.github.com/jklolixxs/e2b0105c8be6023f3941816509a4c453/raw/BigAirport.ini',
      text: 'BigAirport',
    },
    {
      value: 'https://gist.github.com/jklolixxs/9f6989137a2cfcc138c6da4bd4e4cbfc/raw/PaoLuCloud.ini',
      text: '跑路云',
    },
    {
      value: 'https://gist.github.com/jklolixxs/fccb74b6c0018b3ad7b9ed6d327035b3/raw/WaveCloud.ini',
      text: 'WaveCloud',
    },
    {
      value: 'https://gist.github.com/jklolixxs/bfd5061dceeef85e84401482f5c92e42/raw/JiJi.ini',
      text: '几鸡',
    },
    {
      value: 'https://gist.github.com/jklolixxs/6ff6e7658033e9b535e24ade072cf374/raw/SJ.ini',
      text: '四季加速',
    },
    {
      value: 'https://gist.github.com/jklolixxs/24f4f58bb646ee2c625803eb916fe36d/raw/ImmTelecom.ini',
      text: 'ImmTelecom',
    },
    {
      value: 'https://gist.github.com/jklolixxs/b53d315cd1cede23af83322c26ce34ec/raw/AmyTelecom.ini',
      text: 'AmyTelecom',
    },
    {
      value: 'https://subweb.s3.fr-par.scw.cloud/RemoteConfig/customized/convenience.ini',
      text: 'LinkCube',
    },
    {
      value: 'https://gist.github.com/jklolixxs/ff8ddbf2526cafa568d064006a7008e7/raw/Miaona.ini',
      text: 'Miaona',
    },
    {
      value: 'https://gist.github.com/jklolixxs/df8fda1aa225db44e70c8ac0978a3da4/raw/Foo&Friends.ini',
      text: 'Foo&Friends',
    },
    {
      value: 'https://gist.github.com/jklolixxs/b1f91606165b1df82e5481b08fd02e00/raw/ABCloud.ini',
      text: 'ABCloud',
    },
    {
      value: 'https://raw.githubusercontent.com/SleepyHeeead/subconverter-config/master/remote-config/customized/xianyu.ini',
      text: '咸鱼',
    },
    {
      value: 'https://subweb.oss-cn-hongkong.aliyuncs.com/RemoteConfig/customized/convenience.ini',
      text: '便利店',
    },
    {
      value: 'https://raw.githubusercontent.com/Mazeorz/airports/master/Clash/SSRcloud.ini',
      text: 'CNIX',
    },
    {
      value: 'https://raw.githubusercontent.com/Mazetsz/ACL4SSR/master/Clash/config/V2rayPro.ini',
      text: 'Nirvana',
    },
    {
      value: 'https://raw.githubusercontent.com/Mazeorz/airports/master/Clash/V2Pro.ini',
      text: 'V2Pro',
    },
    {
      value: 'https://raw.githubusercontent.com/Mazeorz/airports/master/Clash/Stitch.ini',
      text: '史迪仔-自动测速',
    },
    {
      value: 'https://raw.githubusercontent.com/Mazeorz/airports/master/Clash/Stitch-Balance.ini',
      text: '史迪仔-负载均衡',
    },
    {
      value: 'https://raw.githubusercontent.com/SleepyHeeead/subconverter-config/master/remote-config/customized/maying.ini',
      text: 'Maying',
    },
    {
      value: 'https://subweb.s3.fr-par.scw.cloud/RemoteConfig/customized/ytoo.ini',
      text: 'Ytoo',
    },
    {
      value: 'https://raw.nameless13.com/api/public/dl/M-We_Fn7/w8ves.ini',
      text: 'w8ves',
    },
    {
      value: 'https://raw.githubusercontent.com/SleepyHeeead/subconverter-config/master/remote-config/customized/nyancat.ini',
      text: 'NyanCAT',
    },
    {
      value: 'https://subweb.s3.fr-par.scw.cloud/RemoteConfig/customized/nexitally.ini',
      text: 'Nexitally',
    },
    {
      value: 'https://raw.githubusercontent.com/SleepyHeeead/subconverter-config/master/remote-config/customized/socloud.ini',
      text: 'SoCloud',
    },
    {
      value: 'https://raw.githubusercontent.com/SleepyHeeead/subconverter-config/master/remote-config/customized/ark.ini',
      text: 'ARK',
    },
    {
      value: 'https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/n3ro_optimized.ini',
      text: 'N3RO',
    },
    {
      value: 'https://gist.githubusercontent.com/tindy2013/1fa08640a9088ac8652dbd40c5d2715b/raw/scholar_optimized.ini',
      text: 'Scholar',
    },
    {
      value: 'https://subweb.s3.fr-par.scw.cloud/RemoteConfig/customized/flower.ini',
      text: 'Flowercloud',
    },
    {
      value: 'https://raw.githubusercontent.com/SleepyHeeead/subconverter-config/master/remote-config/special/netease.ini',
      text: 'NeteaseUnblock',
    },
    {
      value: 'https://raw.githubusercontent.com/SleepyHeeead/subconverter-config/master/remote-config/special/basic.ini',
      text: 'Basic',
    }
    
    
  ],
};
