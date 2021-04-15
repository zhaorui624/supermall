//本文件用于设置别名
module.exports={
    configureWebpack:{
        reslove:{
            alias:{
                //此处已经默认设置src为@，不需要重复设置
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'newwork':'@/network',
                'views':'@/views'
            }
        }
    }
}