<?php
$tree = array(
    array( 
        'name' => 'elem1'
    ),
    array(
        'name'  => 'elem2',
        'value' => array(
            array( 'name' => 'elem2.1' ),
            array( 
                'name'  => 'elem2.2',
                'value' => array(
                    array( 'name' => 'elem2.2.1' ),
                    array( 'name' => 'elem2.2.2' ),
                    array( 'name' => 'elem2.2.3' )
                )
            ),
            array(
                'name'  => 'elem2.3',
                'value' => array(
                    array( 'name' => 'elem2.3.1' ),
                    array( 'name' => 'elem2.3.2' ),
                    array( 'name' => 'elem2.3.3' )
                )
            ),
            array( 'name' => 'elem2.4' ),
        )
    ),
    array( 'name' => 'elem3' )
);

die( json_encode( $tree ) );