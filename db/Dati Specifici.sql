USE [VRT]
GO

INSERT INTO [dbo].[BancaAnagrafica]
           ([Banca]
           ,[Agenzia]
           ,[Intestatario]
           ,[IBAN]
           ,[Attivo]
           ,[Estero]
           ,[idAnag])
     VALUES
		('UNICREDIT BANCA SPA', null,null, 'IT50X0200801820000000770802','true','false',1),
        ('UNICREDIT BANCA SPA', null,null, 'IT92K0200801820000040765411','true','false',2),
        ('UNICREDIT BANCA SPA', null,null, 'IT92K0200801820000040765411','true','false',3),
        ('UNICREDIT BANCA SPA', null,null, 'IT92K0200801820000040765411','true','false',4),
        ('UNICREDIT BANCA SPA', null,null, 'IT92K0200801820000040765411','true','false',5),
        ('UNICREDIT BANCA SPA', null,null, 'IT92K0200801820000040765411','true','false',6),
        ('UNICREDIT BANCA SPA', null,null, 'IT92K0200801820000040765411','true','false',7),
        ('UNICREDIT BANCA SPA', null,null, 'IT92K0200801820000040765411','true','false',8),
        ('UNICREDIT BANCA SPA', null,null, 'IT92K0200801820000040765411','true','false',9),
        ('UNICREDIT BANCA SPA', null,null, 'IT92K0200801820000040765411','true','false',10),
        ('UNICREDIT BANCA SPA', null, null, 'IT47W0200835040000041051711','true','false',11),
        ('UNICREDIT BANCA SPA', null, null, 'IT47W0200835040000041051711','true','false',12),
        ('BANCA NAZIONALE DEL LAVORO SPA', null, null, 'IT05B0100539100000000200001', 'true', 'false',13),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',14),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',15),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',16),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',17),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',18),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',19),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',20),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',21),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',22),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',23),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',24),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',25),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',26),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',27),
        ('BANCA POPOLARE DI SONDRIO', null, null, 'IT44P0569601800000003106X58', 'true', 'false',28)
GO

USE [VRT]
GO

INSERT INTO [dbo].[DatiSpecifici]
           ([idNaturaGiuridica]
           ,[idFormaGiuridica]
           ,[idAnag]
           ,[Data_Costituzione]
           ,[Data_Inizio_Attivita])
     VALUES
            (null, null,null, 1, '1993-04-01',null),
            (null, null,null, 2, '2006-11-24',null),
            (null, null,null, 3, '2006-11-24',null),
            (null, null,null, 4, '2006-11-24',null),
            (null, null,null, 5, '2006-11-24',null),
            (null, null,null, 6, '2006-11-24',null),
            (null, null,null, 7, '2006-11-24',null),
            (null, null,null, 8, '2006-11-24',null),
            (null, null,null, 9, '2006-11-24',null),
            (null, null,null, 10, '2006-11-24',null),
            (null, null,null, 11, '2007-08-02',null),
            (null, null,null, 12, '2007-08-02',null),
            (null, null,null, 13, null,null),
            (null, null,null, 14, '1982-08-14',null),
            (null, null,null, 15, '1982-08-14',null),
            (null, null,null, 16, '1982-08-14',null),
            (null, null,null, 17, null,null),
            (null, null,null, 18, '1982-08-14',null),
            (null, null,null, 19, '1982-08-14',null),
            (null, null,null, 20, '1982-08-14',null),
            (null, null,null, 21, '1982-08-14',null),
            (null, null,null, 22, '1982-08-14',null),
            (null, null,null, 23, '1982-08-14',null),
            (null, null,null, 24, '1982-08-14',null),
            (null, null,null, 25, '1982-08-14',null),
            (null, null,null, 26, '1982-08-14',null),
            (null, null,null, 27, null,null),
            (null, null,null, 28, '1982-08-14',null)
          
GO