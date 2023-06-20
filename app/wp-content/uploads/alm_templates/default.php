<div class="swiper-slide"><a class="swiper-slide swiper-slide-best-selling" href="<?php the_permalink(); ?>" id="id-<?php the_id(); ?>"
                        title="<?php the_title(); ?>">
                        <div class="good">

							<?php if (has_post_thumbnail( $loop->post->ID )) 
        echo get_the_post_thumbnail($loop->post->ID, 'shop_catalog'); 
        else echo '<img src="'.woocommerce_placeholder_img_src().'" alt="product placeholder Image" width="65px" height="115px" />'; ?>

							<div class="rating">
								<ul class="woocommerce">
<li>
    <?php if ($average = $product->get_average_rating()) : ?>
    <?php echo '<div class="star-rating" title="'.sprintf(__( 'Rated %s out of 5', 'woocommerce' ), $average).'"><span style="width:'.( ( $average / 5 ) * 100 ) . '%"><strong itemprop="ratingValue" class="rating">'.$average.'</strong> '.__( 'out of 5', 'woocommerce' ).'</span></div><div itemprop="ratingValue" class="rating-value">('.$average.')</div>'; ?>
<?php endif; ?>
</li>
</ul>	
</div>	
                            <h3 class="good__title"><?php the_title(); ?></h3>
                            <div class="good-items">
                                <?php
                            if( $product->is_on_sale() ) {
                            
                            echo '<div class="sp"><div class="sp1"><div class="rp"><div class="rp1">$ '.get_post_meta( get_the_ID(), '_sale_price', true ).'</div></div>$ ';
                                
                            echo '<div class="rp2">'.get_post_meta( get_the_ID(), '_regular_price', true ).'</div></div></div>';
                                echo '<button class="good-items__button">Save ';
                                 
                                $a = get_post_meta( get_the_ID(), '_regular_price', true );
                                $b = get_post_meta( get_the_ID(), '_sale_price', true );

								echo (int)$a-(int)$b
								.'</button>';


                                }
                            else{
	
                            echo '<div class="rp"><div class="rp1">$ '.get_post_meta( get_the_ID(), '_regular_price', true ).'</div></div>';
                            }
                            ?>
                                
                            </div>
                            <div class="good__discount">    <?php
                            if( $product->is_on_sale() ) {
                            
                            echo '<div class="good__discount1">sale</div>';}
                            
                            ?></div>
                        </div>
                    </a>
</div>