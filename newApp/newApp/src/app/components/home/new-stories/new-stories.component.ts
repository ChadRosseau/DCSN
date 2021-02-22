import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-stories',
  templateUrl: './new-stories.component.html',
  styleUrls: ['./new-stories.component.css']
})
export class NewStoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  articles = [
    {
      title: "Demo Article 1",
      preview: "https://static.seekingalpha.com/uploads/2018/2/1/47478524-15175167948411086_origin.png",
      publishDate: "19/12/2020",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend malesuada lorem non sollicitudin. Duis turpis dui, tempus blandit ipsum ac, placerat pellentesque elit. Nullam posuere augue sed orci mattis consequat. Sed iaculis nulla quis pharetra rutrum. Mauris massa justo tristique sit amet eros id, auctor commodo tortor. Cras fringilla vitae erat mollis tempor. ",
      author: {
        name: "Ginu Yang",
        pfp: "https://lh3.googleusercontent.com/a-/AOh14GgrdxHtGpz3vLyDd3IXkKps6t1hv14Jro5qPP-Bb2CpAGOf3Vk8opx2qdEQoyLI8soytVTftuZXAFJ3SoFChG5n_prkKmlMVx4mTCoZApyOqt-xWZRTyYzGaFfa5FYoxh24QNaZ3CGcvuZO1EZ7ew13_cDgbTnCa4BwNXppXHVmMcEQYOQAOKaxPBP08ahSeu00SQNkGlw58eT-cBQFj9bRXOFEApWh4pYRG9Pq9dEaY5Cf6Ni7Kr95AHknCMzR3h45obrmvuMBh7ZhS1fMnH7VyGjGOIQLVkv1KZcNyyY2MKs5-0-i0i6yHkjkm-YqGcAV42Vpapj7j7oMYl5vtBTi5DndndCO83dQu_jAc4_a0dSYikgzu1-VaJRMgNvs1LxFagsS40IaDYrVBZ2dDT_KVI96Lwz4Aj7XvzwDRSN5q_D6iJrER8z5IytST68POHFNq5kM032OudGQr8kSlZPGnPBobsb3IOYT7drylkGSUVRAyn5UuCWXru6PrERCb_f6OqywBtWP7a6jNHPFpOKtSTWSa-3stg3QF5TMD9MVDwGMB-p71sVTZD2QZrBBZjZyQb5sNpjtmAZdl72QXopWKqcyfOjBf5xsn-bVUdr01HSeC-kNx-SrOBHflwgfLrNYue771uyVUwwUMl7prVs0u1NkUqq-NnfGYjmq6MUG8oKwaW8o2ozK3KnKjN6uqz8-NSfdsa9JA7fR-sRf3sfHxOFcteF1hMQ_zOgc8tTqc_bz6yw2PJLbjXuhUs5wk8TPZw=s70-p-k-rw-no"
      },
      tags: [
        " Sustainability",
        " Life below Water"
      ]
    },
    {
      title: "Demo Article 2",
      preview: "https://static6.depositphotos.com/1006362/587/i/950/depositphotos_5876984-stock-photo-safari.jpg",
      publishDate: "19/12/2020",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend malesuada lorem non sollicitudin. Duis turpis dui, tempus blandit ipsum ac, placerat pellentesque elit. Nullam posuere augue sed orci mattis consequat. Sed iaculis nulla quis pharetra rutrum. Mauris massa justo tristique sit amet eros id, auctor commodo tortor. Cras fringilla vitae erat mollis tempor. ",
      author: {
        name: "Ishaan Mukherjee",
        pfp: "https://lh3.googleusercontent.com/a-/AOh14GjVLk_ujgTDlK-DPEsTcN_8oGwYozmkGBLzaQnl5CDEdhdjzkrpeadmhnbCy4vAiveQptRUn_RahWeWM30RDQ3I1l_lcm8Nymx3myFkr7AnpK8f8AWCaw0K6PSUfzAsbcsgyEdLn-i7j0-7edLsktXY_s0_68OgPATOnhRU_fi4utDJ4edzCgK3BuA43cBhCBEWCK0X3T9MExKfrxVdXj3qy0j47Vr0FqOeR0t5ovnoTykgncYgwZ3_gURrQ2o44uI15ggQh8fSe7Mm6Ske2a5PDIsyrzXdk2PwAuH7fgQyN4SfPX85LKRmpAsPoVz-gNAmby_ZQEZkYZ28PR0tdAEKuXNpmK94i3XihxFmiIISwRo-1d8qBZJEzR-c6VnkBiOtSglQsmrwET3AxGthPbNIH-zGxMhb4OvnJ6UbmgG-_r1yKJ1bruoZ42caJ9VpNE7xM6fPzsxCIA743y-XupV7kXb7npw45L9zPhlhUAe_o8N7QUqhq0eZKrobiErgs51cwKWqYC2WLKOGSUyZY7B-TWjg40XLYntdyb6lg0BqGihQF2uHZoKtdOGha47OvlOfpfNToVlWnksXUT7KMTLXAxAFjlquVvOQJ5zHBLoZVhrfjLpdn9MaZmnY2xscNlZi9bjOsS1bRHBsQgnjAb-CYBXe75__MLQrP-FUftxnInVkl3yULPRNEKReNRzT13DViXiw43uKo0HMnNlLbTZ0dfGZzCOYC-kD4K58wjS6VG07EouYNm3FEmmUVFMP3YMIDoc=s70-p-k-rw-no"
      },
      tags: [
        " Sustainability",
        " Life on Land"
      ]
    },
    {
      title: "Demo Article 3",
      preview: "https://st.depositphotos.com/2380633/2636/i/600/depositphotos_26360227-stock-photo-begging.jpg",
      publishDate: "19/12/2020",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend malesuada lorem non sollicitudin. Duis turpis dui, tempus blandit ipsum ac, placerat pellentesque elit. Nullam posuere augue sed orci mattis consequat. Sed iaculis nulla quis pharetra rutrum. Mauris massa justo tristique sit amet eros id, auctor commodo tortor. Cras fringilla vitae erat mollis tempor. ",
      author: {
        name: "Kodie Barrett",
        pfp: "https://lh3.googleusercontent.com/a-/AOh14GguD2_HgdUoj2jImC3JLI7HE2pzSNUFptEstr6r9nbuiyjEQQTGm2l4sLBoSAJvirbUD6sHct98mhI-QZb2p-zKcJSSmrzxnqzuhxq7FYW4gW228TZ6w_dWffEnIMkad80lN86GZP-NpXRx1YuyAAKLaoig8JkZaF6wfIahjMA3eDyiqjZx2PBXxJCmgRx_wQT6bIdPs6G0ESc9gk_IKqzb3r1W07ATVzb9bGU5U1WxE3cqfyZEBmvUQF1Szh_1wX3iONlDD0ioXX7KDufSG8umrudQoeVJi8mfQm29Kqw34xejQ0FqZAHLdiD_6OPmEhmyENfCZQCxZQmZRG3rQLLqLq3616i270P6Sb0bhqs1F5IdlSp-E1zmZLY2YLeSMZKydX0wk8SaVQtAkbtkw3zhDlWaoPRjiPAlTgr5YCZnMv0TNllHBe7tef7_qLQtzZdCkIHWxPBgi8omcyQRLuRrcYIx41h0ZXzb7jFA-m-sAUhphfst_rfO5VOAYimKy5qMekfrAKnD-IAtPlMDlKa3KDxtPj6gdoGnPb74vkQRWXZ9U-JXLaRdEaBP_jKTSjQC0iveQ1tXPVvB1oCHe9ZEJNF42UmNh8aP-s81Ug8JJ55zttISMFiLz3wvningfFn4bnrV3kqhCqkbAuLqIn-W4z9D-kR4oYTmxquJpVdM46eVQ4wxJMrmZcH2LYf_FRozvKDN6IwCju9Hii-wkSHuNnFgS3Fq_jBIFWJZhJEhS3-ewu6qJf1djqVthsB-rcrgvck=s70-p-k-rw-no"
      },
      tags: [
        " Poverty",
        " Hunger"
      ]
    }
  ];
}
