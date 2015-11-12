/**
 * Created by philipsenger on 3/10/15.
 */
var Promise = require('bluebird');
//module.exports = function (shipit) {
//    shipit.initConfig({
//        dev: {
//            servers: '192.168.33.11'
//        }
//    });
//
//    shipit.task('pwd', function () {
//        return shipit.remote('pwd');
//    });
//};

// Running this requires installing Shipit (https://github.com/shipitjs/shipit).
// Then use commands like:
//   shipit production install
//   shipit production deploy
//   shipit production upgrade
module.exports = function ( shipit ) {
    require ( 'shipit-deploy' ) ( shipit );

    shipit.initConfig ( {
        //default: {
        //    workspace: '/tmp/github-monitor',
        //    deployTo: '/tmp/deploy_to',
        //    repositoryUrl: 'https://github.com/user/repo.git',
        //    ignores: ['.git', 'node_modules'],
        //    keepReleases: 2,
        //    deleteOnRollback: false,
        //    key: '/path/to/key',
        //    shallowClone: true
        //},
        //prod: {
        //    servers: [ 'root@xxxxxx' ]
        //},
        dev : {
            servers: [ 'vagrant@192.168.33.11' ]
        }
    } );

    var deployFile = 'deploy-' + new Date ().getTime ();

    //shipit.task ( 'install', function () {
    //    shipit.remote ( 'sudo apt-get update' ).then ( function () {
    //        // We'll wait for the update to complete before installing some software I like to have on the
    //        // server.
    //        shipit.remote ( 'sudo apt-get -y install apache2 emacs23 git unzip' ).then ( function () {
    //            // We don't need the following set of actions to happen in any particular order. For example,
    //            // we're good if the disables happen before the enables.
    //            var promises = [];
    //
    //            // We couldn't copy this file earlier because there isn't a spot for it until after Apache is installed.
    //            promises.push ( shipit.remoteCopy ( 'paperquik.conf', '/etc/apache2/sites-available/' ) );
    //
    //            promises.push ( shipit.remote ( 'sudo a2enmod expires headers rewrite proxy_http' ) );
    //
    //            promises.push ( shipit.remote ( 'sudo a2dissite 000-default' ) );
    //
    //            promises.push ( shipit.remote ( 'sudo a2ensite paperquik mdm' ) );
    //
    //            // But we do need this to wait until we've complete all of the above. So we have it wait until
    //            // all of their promises have resolved.
    //            Promise.all ( promises ).then ( function () {
    //                shipit.remote ( 'sudo service apache2 reload' );
    //            } );
    //        } );
    //    } );
    //} );

    shipit.task ( 'deploy', function () {
        shipit.log ( 'Deploy the current build ' );
        /**
         * When you run npm shrinkwrap in a project after running npm install, it creates a file called npm-shrinkwrap.json
         * which lists the exact package versions of all the installed packages in the entire hierarchy. If you check
         * this into your version control and your collegue clones and does an npm install, then this time they will
         * get the exact package version for the full hierarchy as specified in the npm-shrinkwrap.json file
         */
        shipit.local ( 'npm install' )
            .then ( function ( result ) {
                return shipit.local ( 'npm outdated' )
            } )
            .then ( function ( result ) {
                return shipit.local ( 'npm shrinkwrap' )
            } )
            .then ( function () {
                return shipit.local ( 'tar -czf ../dist/' + deployFile + '.tar.gz .' )
            } )
            .then ( function ( result ) {
                return shipit.local ( 'rm -f npm-shrinkwrap.json' )
            } )
            .then ( function ( result ) {
                return shipit.remoteCopy ( '../dist/' + deployFile + '.tar.gz', '/tmp/' + deployFile + '.tar.gz' );
            } )
            .then ( function ( result ) {
                return shipit.remote ( 'rm -rf /tmp/app; mkdir /tmp/app; tar -xfz /tmp/' + deployFile + '.tar.gz /tmp/app' );
            } )
            .then ( function () {
                shipit.remote ( 'pm2 start /tmp/app/app.js' );
            } );


            //.then ( function () {
            //    return shipit.remoteCopy ( 'dist/*', '/tmp/' + tmpDir );
            //} )
            //.then ( function () {
            //    shipit.log ( 'Move folder to web root' );
            //    return shipit.remote ( 'sudo cp -R /tmp/' + tmpDir + '/*' + ' /var/www/paperquik' )
            //} )
            //.then ( function () {
            //    shipit.remote ( 'rm -rf /tmp/' + tmpDir );
            //} );
    } );

    //shipit.task ( 'upgrade', function () {
    //    shipit.log ( 'Fetches the list of available Ubuntu upgrades.' );
    //    shipit.remote ( 'sudo apt-get update' ).then ( function () {
    //        shipit.log ( 'Now perform the upgrade.' );
    //        shipit.remote ( 'sudo apt-get -y dist-upgrade' );
    //    } );
    //} );
};