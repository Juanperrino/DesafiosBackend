import os from 'os';

const info = async (req, res, next) => {
      try {
            const data = {
                  cpus: os.cpus().length,
                  arg: process.argv.slice(2),
                  so: process.platform,
                  vn: process.version,
                  rss: process.memoryUsage().rss,
                  pe: process.execPath,
                  pid: process.pid,
                  carp: process.cwd(),
            };
            res.render('./info', data);
      } catch (error) {
            next(error);
      }
};
export { info };
